import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type Project = {
  slug: string;
  path: string;
  title: string;
  description: string;
  published: boolean;
  featured: boolean;
  date?: string;
  repository?: string;
  url?: string;
  cover?: string;
  tags: string[];
  contributors: string[];
  body: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function readProject(file: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const match = raw.match(FRONTMATTER);
  if (!match) {
    throw new Error(`Missing frontmatter in ${file}`);
  }
  const data = (parse(match[1]) ?? {}) as Record<string, unknown>;
  if (typeof data.title !== "string" || typeof data.description !== "string") {
    throw new Error(`Missing title or description in ${file}`);
  }

  const slug = file.replace(/\.mdx$/, "");
  return {
    slug,
    path: `/projects/${slug}`,
    title: data.title,
    description: data.description,
    published: data.published !== false,
    featured: data.featured === true,
    date: data.date ? String(data.date) : undefined,
    repository: data.repository as string | undefined,
    url: data.url as string | undefined,
    cover: data.cover as string | undefined,
    tags: (data.tags as string[] | undefined) ?? [],
    contributors: (data.contributors as string[] | undefined) ?? [],
    body: raw.slice(match[0].length),
  };
}

export const allProjects: Project[] = fs
  .readdirSync(PROJECTS_DIR)
  .filter((file) => file.endsWith(".mdx"))
  .map(readProject);
