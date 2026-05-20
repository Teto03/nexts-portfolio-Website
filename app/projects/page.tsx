import Link from "next/link";
import React from "react";
import { allProjects } from "@/.contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

export const revalidate = 60;

async function getViews(slugs: string[]): Promise<Record<string, number>> {
  if (slugs.length === 0) return {};
  try {
    const redis = Redis.fromEnv();
    const keys = slugs.map((s) => ["pageviews", "projects", s].join(":"));
    const viewsArray = await redis.mget<number[]>(...keys);
    return slugs.reduce((acc, slug, i) => {
      const viewCount = viewsArray?.[i];
      acc[slug] = typeof viewCount === "number" ? viewCount : 0;
      return acc;
    }, {} as Record<string, number>);
  } catch {
    return slugs.reduce((acc, slug) => {
      acc[slug] = 0;
      return acc;
    }, {} as Record<string, number>);
  }
}

export default async function ProjectsPage() {
  const published = allProjects.filter((p) => p.published === true);
  const views = await getViews(published.map((p) => p.slug));

  const sorted = published.sort(
    (a, b) =>
      new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
      new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
  );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
            Projects
          </h2>
          <p className="mt-4 mb-6 text-zinc-400">
            Some of the projects are made for university exams and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
          {sorted.map((project) => (
            <Card key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <article className="relative w-full h-full p-4 md:p-8 flex flex-col min-h-[320px]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100">
                      {project.date ? (
                        <time dateTime={new Date(project.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(project.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[project.slug] ?? 0,
                      )}
                    </span>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                    {project.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] bg-zinc-800/80 border border-zinc-700 rounded-md text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-auto pt-4">
                    <p className="hidden text-zinc-200 group-hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
