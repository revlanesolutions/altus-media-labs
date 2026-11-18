import { Fragment, type ReactNode } from "react";
import type { MarkedToken, Token, Tokens } from "marked";
import type { ArticleBlock } from "@/lib/article-markdown";

function inlineContent(tokens: Token[]): ReactNode {
  const nodes: ReactNode[] = [];
  let text = "";
  const flushText = () => {
    if (text) nodes.push(text);
    text = "";
  };

  for (const [index, token] of (tokens as MarkedToken[]).entries()) {
    // Keep escaped punctuation in the same text node as adjacent prose.
    if (token.type === "escape" || (token.type === "text" && !token.tokens)) {
      text += token.text;
      continue;
    }
    flushText();
    let content: ReactNode;
    switch (token.type) {
      case "text":
        content = token.tokens ? inlineContent(token.tokens) : token.text;
        break;
      case "strong":
        content = (
          <strong className="font-semibold text-foreground">
            {inlineContent(token.tokens)}
          </strong>
        );
        break;
      case "em":
        content = <em>{inlineContent(token.tokens)}</em>;
        break;
      case "link":
        content = (
          <a
            href={
              /^(https?:|mailto:|\/|#)/i.test(token.href)
                ? token.href
                : undefined
            }
            title={token.title || undefined}
            className="text-primary underline"
          >
            {inlineContent(token.tokens)}
          </a>
        );
        break;
      case "codespan":
        content = <code>{token.text}</code>;
        break;
      case "br":
        content = <br />;
        break;
      default:
        content = token.raw;
    }
    nodes.push(<Fragment key={index}>{content}</Fragment>);
  }
  flushText();
  return nodes;
}

function ArticleList({ block }: { block: Tokens.List }) {
  const items = block.items.map((item, index) => (
    <li className="mb-2.5 pl-1.5" key={index}>
      {item.tokens
        .filter((token) => token.type !== "space")
        .map((token, tokenIndex) => {
          if (token.type === "list")
            return (
              <ArticleList key={tokenIndex} block={token as Tokens.List} />
            );
          const content =
            "tokens" in token && token.tokens
              ? inlineContent(token.tokens)
              : token.raw;
          return item.loose ? (
            <p className="mb-2.5 last:mb-0" key={tokenIndex}>
              {content}
            </p>
          ) : (
            <Fragment key={tokenIndex}>{content}</Fragment>
          );
        })}
    </li>
  ));
  return block.ordered ? (
    <ol className="mb-6 list-decimal pl-[26px]" start={block.start || 1}>
      {items}
    </ol>
  ) : (
    <ul className="mb-6 list-disc pl-[26px]">{items}</ul>
  );
}

export function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="text-reading">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const Heading = block.depth === 2 ? "h2" : "h3";
            return (
              <Heading
                className={`mt-12 mb-5 scroll-mt-28 font-display font-bold leading-snug text-foreground ${block.depth === 2 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
                id={`section-${index}`}
                key={index}
              >
                {inlineContent(block.tokens)}
              </Heading>
            );
          }
          case "paragraph":
            return (
              <p className="mb-6" key={index}>
                {inlineContent(block.tokens)}
              </p>
            );
          case "list":
            return <ArticleList block={block} key={index} />;
        }
      })}
    </div>
  );
}
