import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  keywords: string[];
  readingTime: string;
  /** Rendered HTML body (from markdown). */
  html: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parsePost(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "description", "category", "publishedAt"]) {
    if (!data[field]) {
      throw new Error(
        `content/blog/${filename} is missing required frontmatter field "${field}"`,
      );
    }
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    category: String(data.category),
    publishedAt: String(data.publishedAt),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    author: data.author ? String(data.author) : "PS360 Consulting",
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    readingTime: estimateReadingTime(content),
    html: marked.parse(content, { async: false }),
  };
}

/** All posts, newest first. Reads content/blog/*.md at build time. */
export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}
