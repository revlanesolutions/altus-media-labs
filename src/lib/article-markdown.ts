import { Lexer, type Token, type Tokens } from "marked";

export type ArticleBlock = Tokens.Paragraph | Tokens.Heading | Tokens.List;

export function parseArticleContent(content: string): ArticleBlock[] {
  return Lexer.lex(content, { gfm: false })
    .filter((token) => !["space", "def"].includes(token.type))
    .map((token) => {
      if (!isArticleBlock(token))
        throw new Error(`Unsupported article Markdown block: ${token.type}`);
      if (token.type === "heading" && ![2, 3].includes(token.depth))
        throw new Error(
          "Use ## for article sections and ### for subsections; the page supplies its title.",
        );
      return token;
    });
}

/** Block indexes retain the existing section-* links during this migration. */
export function articleHeadings(blocks: ArticleBlock[]) {
  return blocks.flatMap((block, index) =>
    block.type === "heading"
      ? [{ id: `section-${index}`, title: inlinePlainText(block.tokens) }]
      : [],
  );
}

function inlinePlainText(tokens: Token[]): string {
  return tokens
    .map((token) => {
      if ("tokens" in token && token.tokens)
        return inlinePlainText(token.tokens);
      if ("text" in token && typeof token.text === "string") return token.text;
      return token.type === "br" ? " " : "";
    })
    .join("");
}

function isArticleBlock(token: Token): token is ArticleBlock {
  return ["paragraph", "heading", "list"].includes(token.type);
}
