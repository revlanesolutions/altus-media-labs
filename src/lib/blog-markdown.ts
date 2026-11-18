import { parseDocument } from "yaml";
import type { BlogPost } from "@/data/blog-types";
import type { SiteImage } from "@/data/imagery";

const fields = [
  "title",
  "excerpt",
  "category",
  "author",
  "authorRole",
  "date",
  "readTime",
] as const;
export const blogSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** The filename supplies the slug; frontmatter and Markdown supply the article. */
export function parseBlogPost(slug: string, source: string): BlogPost {
  if (!blogSlugPattern.test(slug))
    throw new Error(`Invalid blog filename: ${slug}.md`);
  const match = source
    .replace(/^\uFEFF/, "")
    .replace(/\r\n?/g, "\n")
    .match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
  if (!match)
    throw new Error(
      `${slug}.md must start with YAML frontmatter between --- lines.`,
    );
  const frontmatter = parseDocument(match[1]);
  if (frontmatter.errors.length)
    throw new Error(`${slug}.md: ${frontmatter.errors[0].message}`);
  const data: unknown = frontmatter.toJS();
  if (!isRecord(data))
    throw new Error(`${slug}.md frontmatter must contain named fields.`);
  for (const field of Object.keys(data)) {
    if (![...fields, "image"].includes(field))
      throw new Error(`${slug}.md has an unknown field: ${field}`);
  }
  const metadata = Object.fromEntries(
    fields.map((field) => {
      const value = data[field];
      if (typeof value !== "string" || !value.trim())
        throw new Error(`${slug}.md needs a nonempty ${field} string.`);
      return [field, value.trim()];
    }),
  ) as Pick<BlogPost, (typeof fields)[number]>;
  const date = new Date(metadata.date + "T12:00:00Z");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(metadata.date) ||
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== metadata.date
  ) {
    throw new Error(`${slug}.md needs a valid date in YYYY-MM-DD format.`);
  }
  const content = match[2].trim();
  if (!content)
    throw new Error(`${slug}.md needs article content below its frontmatter.`);
  return {
    slug,
    ...metadata,
    content,
    ...(data.image === undefined
      ? {}
      : { image: parseImage(data.image, slug) }),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseImage(value: unknown, slug: string): SiteImage {
  if (
    !isRecord(value) ||
    typeof value.src !== "string" ||
    !value.src.startsWith("/") ||
    value.src.startsWith("//") ||
    value.src.split("/").includes("..") ||
    typeof value.alt !== "string" ||
    !value.alt.trim() ||
    !Number.isInteger(value.width) ||
    Number(value.width) <= 0 ||
    !Number.isInteger(value.height) ||
    Number(value.height) <= 0 ||
    !["editorial", "project", "photo"].includes(String(value.kind))
  ) {
    throw new Error(
      `${slug}.md image needs a local src, alt, positive width/height, and valid kind.`,
    );
  }
  if (
    value.fit !== undefined &&
    value.fit !== "cover" &&
    value.fit !== "contain"
  )
    throw new Error(`${slug}.md image.fit must be cover or contain.`);
  if (value.focalPoint !== undefined && typeof value.focalPoint !== "string")
    throw new Error(`${slug}.md image.focalPoint must be a string.`);
  return {
    src: value.src,
    alt: value.alt,
    width: Number(value.width),
    height: Number(value.height),
    kind: value.kind as SiteImage["kind"],
    ...(value.fit === undefined ? {} : { fit: value.fit }),
    ...(value.focalPoint === undefined ? {} : { focalPoint: value.focalPoint }),
  };
}
