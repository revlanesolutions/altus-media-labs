import { Lexer, type Token, type Tokens } from "marked";

export type LegalBlock = Tokens.Paragraph | Tokens.Heading | Tokens.List;
export type LegalDocument = {
  title: string;
  updated: string;
  introduction: LegalBlock[];
  sections: { heading: Tokens.Heading; blocks: LegalBlock[] }[];
};

/** Parse the editable document header and group content under its ## headings. */
export function parseLegalMarkdown(markdown: string): LegalDocument {
  const tokens = Lexer.lex(markdown, { gfm: false }).filter(
    (token) => token.type !== "space" && token.type !== "def",
  );
  const [title, updated, ...body] = tokens;
  if (
    title?.type !== "heading" ||
    title.depth !== 1 ||
    updated?.type !== "paragraph" ||
    !updated.text.startsWith("Last updated: ")
  ) {
    throw new Error(
      "Legal Markdown must start with # Title and Last updated: date.",
    );
  }
  const document: LegalDocument = {
    title: title.text,
    updated: updated.text.slice("Last updated: ".length),
    introduction: [],
    sections: [],
  };
  let blocks = document.introduction;
  for (const token of body) {
    if (!isLegalBlock(token)) {
      throw new Error(`Unsupported legal Markdown block: ${token.type}`);
    }
    if (token.type === "heading" && token.depth === 2) {
      const section = { heading: token, blocks: [] as LegalBlock[] };
      document.sections.push(section);
      blocks = section.blocks;
    } else if (token.type === "heading" && token.depth !== 3) {
      throw new Error("Use ## for legal sections and ### for subsections.");
    } else {
      blocks.push(token);
    }
  }
  return document;
}

function isLegalBlock(token: Token): token is LegalBlock {
  return ["paragraph", "heading", "list"].includes(token.type);
}
