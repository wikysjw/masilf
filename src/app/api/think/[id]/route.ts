import { NextResponse } from "next/server";

import { thinkService } from "@/server/thinkService";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await thinkService.get(params.id);
  if (!item) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const item = await thinkService.update(params.id, {
    author: body.author,
    content: body.content,
    hashtags: body.hashtags,
    emotion: body.emotion,
    agree: body.agree,
  });
  if (!item) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const ok = await thinkService.remove(params.id);
  if (!ok) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
