import { notFound } from "next/navigation";
import { allProjects } from "@/.contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const redis = Redis.fromEnv();

export async function generateStaticParams() {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  const contributors = (project as { contributors?: string[] }).contributors;

  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-900/95 to-black">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className="px-6 py-12 mx-auto max-w-3xl prose prose-invert prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
      </article>

      {contributors && contributors.length > 0 ? (
        <div className="px-6 pb-16 mx-auto max-w-3xl">
          <div className="border-t border-zinc-800 pt-8">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Contributors
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {contributors.map((name) => (
                <li
                  key={name}
                  className="px-3 py-1 text-xs bg-zinc-800/60 border border-zinc-700 rounded-full text-zinc-300"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
