import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const highlights = [
  { title: "하루의 기록", desc: "아이디어가 사라지기 전에 간단히 남겨보세요." },
  { title: "태그로 정리", desc: "감정과 해시태그로 생각을 정돈합니다." },
  { title: "함께 나누기", desc: "가볍게 공유하고 대화를 이어가세요." },
];

async function signupAction(formData: FormData) {
  "use server";
  const email = (formData.get("email") as string | null)?.trim();
  const password = (formData.get("password") as string | null)?.trim();
  const passwordConfirm = (formData.get("passwordConfirm") as string | null)?.trim();
  const name = (formData.get("name") as string | null)?.trim();

  if (!email || !password || !passwordConfirm) {
    redirect("/signup?error=missing");
  }

  if (password !== passwordConfirm) {
    redirect("/signup?error=notmatch");
  }

  const exists = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (exists) {
    redirect("/signup?error=exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const createdUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: name || null,
      role: "user",
      status: "active",
      emailVerified: false,
    },
    select: { id: true },
  });

  const cookieStore = await cookies();
  cookieStore.set("auth", "user", {
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });
  cookieStore.set("userId", createdUser.id, {
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });
  redirect("/");
}

export default async function SignupPage() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("auth");
  if (isAuthed) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="relative hidden w-1/2 flex-col justify-between border-r border-indigo-100 bg-white/40 px-12 py-12 text-zinc-900 shadow-inner lg:flex">
        <div className="absolute -left-24 -top-16 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <header className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-lg font-semibold text-white shadow-md">
            M
          </div>
          <div>
            <p className="text-sm font-semibold text-indigo-700">MASIL</p>
            <p className="text-xs text-zinc-500">아이디어를 가볍게 나누는 공간</p>
          </div>
        </header>
        <div className="space-y-4">
          <p className="text-2xl font-semibold leading-tight text-zinc-900">
            오늘의 생각을 <span className="text-indigo-600">회원가입</span>으로 시작하세요.
          </p>
          <p className="text-sm text-zinc-600">
            짧게 적어도 충분해요. 기록하고, 태그로 정리하고, 함께 나눠보세요.
          </p>
          <div className="space-y-3 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-indigo-100 backdrop-blur">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-sm">✨</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs font-semibold text-zinc-500">© {new Date().getFullYear()} Masil</p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
        <div className="w-full max-w-md rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-zinc-100 backdrop-blur">
          <div className="mb-6 space-y-2 text-center">
            <p className="text-xs font-semibold text-indigo-600">Start here</p>
            <h1 className="text-2xl font-semibold text-zinc-900">회원가입</h1>
            <p className="text-sm text-zinc-500">간단한 정보로 계정을 만들어보세요.</p>
          </div>

          <form className="space-y-4" action={signupAction}>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600">이름</label>
              <input
                type="text"
                name="name"
                placeholder="홍길동"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white text-zinc-600 focus:ring-4"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600">이메일</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white text-zinc-600 focus:ring-4"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600">비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white text-zinc-600 focus:ring-4"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600">비밀번호 확인</label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white text-zinc-600 focus:ring-4"
                required
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-black/30"
            >
              계정 만들기
            </button>
          </form>

          <div className="mt-6 space-y-3 rounded-2xl bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
            <p className="font-semibold text-zinc-800">이미 계정이 있나요?</p>
            <p>
              지금 바로 로그인하세요.{" "}
              <Link href="/login" className="font-semibold text-indigo-600">
                로그인으로 이동
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
