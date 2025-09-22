import Link from "next/link";
import React from "react";
import { allProjects } from "@/.contentlayer/generated";

import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  // Debug logs per verificare i progetti disponibili
  console.log("All Projects slugs:", allProjects.map(p => p.slug));
  console.log("Calculator exists:", allProjects.some(p => p.slug === "calculator"));
  
  const keys = allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"));
  const viewsArray = await redis.mget(keys);

  const views = allProjects.reduce((acc, project, i) => {
    const viewCount = viewsArray?.[i];
    acc[project.slug] = typeof viewCount === "number" ? viewCount : 0;
    return acc;
  }, {} as Record<string, number>);

  // Modifica la condizione di filtro per renderla più esplicita
  const sorted = allProjects
    .filter((p) => {
      console.log(`Project ${p.slug}: published = ${p.published}`);
      return p.published === true;
    })
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
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
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[project.slug] ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
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
                    <span className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[project.slug] ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
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
