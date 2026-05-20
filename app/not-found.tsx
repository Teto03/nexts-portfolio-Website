import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen px-6 bg-gradient-to-tl from-black via-zinc-600/20 to-black text-center">
      <p className="text-sm uppercase tracking-widest text-zinc-500">404</p>
      <h1 className="mt-4 text-4xl sm:text-6xl font-display text-zinc-100">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded-md text-zinc-100 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/projects"
          className="px-4 py-2 text-sm border border-zinc-700 hover:border-zinc-500 rounded-md text-zinc-300 hover:text-zinc-100 transition-colors"
        >
          Browse projects
        </Link>
      </div>
    </div>
  );
}
