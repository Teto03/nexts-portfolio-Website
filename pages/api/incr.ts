import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

import { PROJECT_SLUGS } from "@/lib/project-slugs";

const redis = Redis.fromEnv();
const SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;
export const config = {
  runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("invalid json", { status: 400 });
  }
  const slug =
    body && typeof body === "object" && "slug" in body
      ? (body as { slug: unknown }).slug
      : undefined;
  // Only accept slugs of existing projects: this stops anyone from creating
  // arbitrary keys in Redis or inflating counters for non-existent pages.
  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug) || !PROJECT_SLUGS.has(slug)) {
    return new NextResponse("Slug not found", { status: 400 });
  }
  // x-forwarded-for may be a list: the first entry is the client.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anonymous";
  if (ip && ip !== "anonymous") {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // deduplicate the ip for each slug
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }
  await redis.incr(["pageviews", "projects", slug].join(":"));
  return new NextResponse(null, { status: 202 });
}
