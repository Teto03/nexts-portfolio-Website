"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen px-6 bg-gradient-to-tl from-black via-zinc-600/20 to-black text-center">
      <p className="text-sm uppercase tracking-widest text-zinc-500">Error</p>
      <h1 className="mt-4 text-4xl sm:text-6xl font-display text-zinc-100">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        An unexpected error occurred. Please try again or go back home.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded-md text-zinc-100 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 text-sm border border-zinc-700 hover:border-zinc-500 rounded-md text-zinc-300 hover:text-zinc-100 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
