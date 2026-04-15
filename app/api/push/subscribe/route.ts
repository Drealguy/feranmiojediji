import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const sub = await req.json();
    if (!sub?.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }
    // Use a stable key derived from the endpoint
    const key = `push:${Buffer.from(sub.endpoint).toString("base64").slice(-60)}`;
    await kv.set(key, JSON.stringify(sub));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}
