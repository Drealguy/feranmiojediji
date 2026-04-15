import { kv } from "@vercel/kv";
import webpush from "web-push";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL ?? "fojediji@gmail.com"}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  // Verify secret so only Sanity webhook (or you) can trigger this
  const secret = req.headers.get("x-notify-secret");
  if (!process.env.NOTIFY_SECRET || secret !== process.env.NOTIFY_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Support both manual payload and Sanity webhook payload
  const title: string = body.title ?? "New post from Feranmi Ojediji";
  const message: string = body.excerpt ?? body.body ?? "A new blog post is live — go read it.";
  const slug: string = body.slug?.current ?? body.slug ?? "";
  const url = `https://feranmiojediji.com/blog${slug ? `/${slug}` : ""}`;

  const payload = JSON.stringify({ title, body: message, url });

  // Get all stored subscriptions
  const keys = await kv.keys("push:*");
  if (!keys.length) return NextResponse.json({ sent: 0 });

  const results = await Promise.allSettled(
    keys.map(async (key) => {
      const raw = await kv.get<string>(key);
      if (!raw) return;
      const sub = typeof raw === "string" ? JSON.parse(raw) : raw;
      return webpush.sendNotification(sub, payload);
    })
  );

  // Remove expired/invalid subscriptions automatically
  const failed = results
    .map((r, i) => (r.status === "rejected" ? keys[i] : null))
    .filter(Boolean) as string[];

  if (failed.length) {
    await Promise.all(failed.map((k) => kv.del(k)));
  }

  const sent = results.filter((r) => r.status === "fulfilled").length;
  return NextResponse.json({ sent, failed: failed.length });
}
