import { Fragment, type ReactNode } from "react";
import type { MarkedToken, Token, Tokens } from "marked";
import type {
  LegalBlock,
  LegalDocument as LegalContent,
} from "@/lib/legal-markdown";

function inlineContent(tokens: Token[]): ReactNode {
  return (tokens as MarkedToken[]).map((token, index) => {
    let content: ReactNode;
    switch (token.type) {
      case "text":
        content = token.tokens
          ? inlineContent(token.tokens)
          : token.text.replace(/\n/g, " ");
        break;
      case "escape":
        content = token.text;
        break;
      case "strong":
        content = (
          <strong className="text-foreground font-normal">
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
    return <Fragment key={index}>{content}</Fragment>;
  });
}

function Paragraph({
  block,
  className,
}: {
  block: Tokens.Paragraph;
  className?: string;
}) {
  // Markdown hard breaks keep the contact details in their compact line layout.
  if (block.tokens.some((token) => token.type === "br")) {
    const lines: Token[][] = [[]];
    for (const token of block.tokens) {
      if (token.type === "br") lines.push([]);
      else lines[lines.length - 1].push(token);
    }
    return (
      <div className="space-y-1 text-foreground">
        {lines.map((line, index) => (
          <p key={index}>{inlineContent(line)}</p>
        ))}
      </div>
    );
  }
  return <p className={className}>{inlineContent(block.tokens)}</p>;
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return blocks.map((block, index) => {
    const previous = blocks[index - 1];
    switch (block.type) {
      case "heading":
        return (
          <h3
            key={index}
            className="heading-card text-lg font-bold text-foreground mb-3"
          >
            {inlineContent(block.tokens)}
          </h3>
        );
      case "paragraph":
        return (
          <Paragraph
            key={index}
            block={block}
            className={
              previous?.type === "list" ||
              (previous?.type === "paragraph" &&
                previous.tokens.some((token) => token.type === "br"))
                ? "mt-4"
                : index < blocks.length - 1
                  ? "mb-4"
                  : undefined
            }
          />
        );
      case "list": {
        const items = block.items.map((item, itemIndex) => (
          <li key={itemIndex}>
            {item.tokens
              .filter((token) => token.type !== "space")
              .map((token, tokenIndex) => (
                <Fragment key={tokenIndex}>
                  {"tokens" in token && token.tokens
                    ? inlineContent(token.tokens)
                    : token.raw}
                </Fragment>
              ))}
          </li>
        ));
        return block.ordered ? (
          <ol
            key={index}
            start={block.start || 1}
            className="space-y-3 ml-5 pl-3 border-l-2 border-border list-decimal"
          >
            {items}
          </ol>
        ) : (
          <ul
            key={index}
            className="space-y-3 ml-5 pl-3 border-l-2 border-border"
          >
            {items}
          </ul>
        );
      }
    }
  });
}

export function LegalDocument({ document }: { document: LegalContent }) {
  return (
    <div>
      {/* Document header: Title and last updated date from Markdown */}
      <div className="mx-auto max-w-[1432px] px-6 lg:px-10 pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-display mb-4">
            {document.title}
          </h1>
          <p className="text-meta">
            Last updated: {document.updated}
          </p>
        </div>
      </div>
      {/* Document content: Introduction and named legal sections */}
      <div className="mx-auto max-w-3xl px-6 lg:px-10 pb-24 md:pb-32">
        <div className="border-t border-border pt-12">
          <div className="text-body text-base leading-relaxed space-y-10">
            <Blocks blocks={document.introduction} />
            {document.sections.map((section, index) => (
              /* Legal section: Name comes from its Markdown ## heading */
              <section key={index}>
                <h2 className="heading-card text-xl md:text-2xl font-bold text-foreground mb-4">
                  {inlineContent(section.heading.tokens)}
                </h2>
                <Blocks blocks={section.blocks} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
