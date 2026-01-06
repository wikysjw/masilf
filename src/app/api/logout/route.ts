import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set("auth", "", { path: "/", maxAge: 0, httpOnly: true });
  cookieStore.set("userId", "", { path: "/", maxAge: 0, httpOnly: true });
  return NextResponse.json({ ok: true });
}
