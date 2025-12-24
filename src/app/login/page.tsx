import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const highlights = [
  { title: "생각 모으기", desc: "하루의 아이디어를 잊기 전에 빠르게 기록하세요." },
  { title: "태그로 정리", desc: "해시태그와 감정으로 흐름을 정돈합니다." },
  { title: "친구와 공유", desc: "가볍게 던지고 대화를 시작하세요." },
];

async function loginAction(formData: FormData) {
  "use server";
  const email = (formData.get("email") as string | null)?.trim();
  const password = (formData.get("password") as string | null)?.trim();
  const isGuest = formData.get("guest") === "1";

  // 간단한 데모용 처리: 입력 유무만 확인하고 세션 쿠키 설정 후 메인으로 이동
  if (!isGuest && (!email || !password)) {
    redirect("/login?error=missing");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", isGuest ? "guest" : "user", {
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });
  redirect("/");
}

export default async function LoginPage() {
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
            당신의 생각을 <span className="text-indigo-600">오늘</span>도 전달해 보세요.
          </p>
          <p className="text-sm text-zinc-600">
            미완성이어도 괜찮아요. 짧게 메모하고, 태그로 정리하고, 사람들과 연결돼요.
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
            <p className="text-xs font-semibold text-indigo-600">Welcome back</p>
            <h1 className="text-2xl font-semibold text-zinc-900">로그인</h1>
            <p className="text-sm text-zinc-500">오늘의 생각을 전할 준비가 되셨나요?</p>
          </div>

          <form className="space-y-4" action={loginAction}>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600">이메일</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white focus:ring-4"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-600">
                <label>비밀번호</label>
                <Link href="#" className="text-indigo-600">
                  비밀번호 찾기
                </Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white focus:ring-4"
                required
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-black/30"
            >
              로그인
            </button>
            <button
              type="submit"
              name="guest"
              value="1"
              className="w-full rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              게스트로 둘러보기
            </button>
          </form>

          <div className="mt-6 space-y-3 rounded-2xl bg-zinc-50 px-4 py-3 text-xs text-zinc-600">
            <p className="font-semibold text-zinc-800">아직 계정이 없나요?</p>
            <p>
              빠르게 가입하고 당신의 생각을 남겨보세요.{" "}
              <Link href="#" className="font-semibold text-indigo-600">
                계정 만들기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
