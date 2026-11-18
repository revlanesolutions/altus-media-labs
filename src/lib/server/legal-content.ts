import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseLegalMarkdown } from "@/lib/legal-markdown";

const documents = {
  "privacy-policy": () =>
    readFileSync(
      join(process.cwd(), "src/content/legal/privacy-policy.md"),
      "utf8",
    ),
  "terms-of-service": () =>
    readFileSync(
      join(process.cwd(), "src/content/legal/terms-of-service.md"),
      "utf8",
    ),
};

export function getLegalDocument(slug: keyof typeof documents) {
  return parseLegalMarkdown(documents[slug]());
}
