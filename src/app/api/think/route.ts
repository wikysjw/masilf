import { NextResponse } from "next/server";

import { thinkService } from "@/server/thinkService";

export async function GET() {
  const items = await thinkService.list();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.author || !body?.content) {
    return NextResponse.json({ error: "author and content required" }, { status: 400 });
  }
  const hashtags = Array.isArray(body.hashtags) ? body.hashtags : [];
  const emotion = Array.isArray(body.emotion) ? body.emotion : [];
  const agree = typeof body.agree === "number" ? body.agree : 0;
  const item = await thinkService.create({
    author: body.author,
    content: body.content,
    hashtags,
    emotion,
    agree,
  });
  return NextResponse.json(item, { status: 201 });
}
