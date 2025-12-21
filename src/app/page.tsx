import { Contact, Post, Story } from "@/lib/types/feed";
import WriteComposer from "@/components/WriteComposer";

const navLinks = [
  { label: "뉴스 피드", icon: "🏠" },
  { label: "메시지", icon: "💬" },
  { label: "마켓플레이스", icon: "🛍️" },
  { label: "그룹", icon: "👥" },
  { label: "이벤트", icon: "📅" },
];

const shortcuts = [
  { label: "내 페이지", color: "bg-indigo-500" },
  { label: "사이드 프로젝트", color: "bg-amber-500" },
  { label: "러닝 메이트", color: "bg-emerald-500" },
];

const posts: Post[] = [
  {
    id: 1,
    author: "김민서",
    role: "프로덕트 매니저",
    time: "2시간 전",
    text: "오늘 새벽에 스프린트 리뷰를 마쳤어요. 작은 실험들을 빠르게 돌리니 유저 피드백이 바로 보이네요. 다음 주에는 온보딩 흐름을 더 줄여보려고 합니다.",
    likes: 128,
    comments: 34,
    shares: 9,
    badge: "업데이트",
    gradient: "from-indigo-500 via-blue-500 to-cyan-400",
  },
  {
    id: 2,
    author: "박지훈",
    role: "디자이너",
    time: "4시간 전",
    text: "다크 모드에서 대비를 더 높였어요. 버튼 그림자도 줄여서 더 차분한 느낌으로 정리했습니다. 피드백 환영!",
    likes: 86,
    comments: 19,
    shares: 3,
    badge: "디자인 노트",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: 3,
    author: "이서준",
    role: "프론트엔드",
    time: "어제",
    text: "실시간 알림 웹소켓을 붙였어요. 서버 부하 없이 깔끔하게 흘러가는지 모니터링 중입니다. 혹시 끊김 있으면 알려주세요.",
    likes: 203,
    comments: 52,
    shares: 17,
    gradient: "from-emerald-500 via-teal-500 to-sky-500",
  },
];

const stories: Story[] = [
  { name: "민지", status: "도쿄 출근길", gradient: "from-fuchsia-500 via-purple-500 to-indigo-500" },
  { name: "지환", status: "아침 러닝", gradient: "from-orange-400 via-amber-500 to-amber-300" },
  { name: "다인", status: "팀 워크샵", gradient: "from-emerald-400 via-lime-400 to-teal-400" },
  { name: "현우", status: "카페에서", gradient: "from-sky-400 via-blue-500 to-indigo-500" },
];

const contacts: Contact[] = [
  { name: "은서", status: "온라인" },
  { name: "주호", status: "5분 전" },
  { name: "채린", status: "활동 중" },
  { name: "연우", status: "방금" },
  { name: "도영", status: "30분 전" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-lg font-semibold text-white shadow-sm">
              M
            </div>
            <div className="relative hidden sm:block">
              <input
                className="h-10 w-64 rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white focus:ring-4"
                placeholder="생각 검색 또는 주제 찾기..."
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                ⌘K
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-700">
            <button className="hidden items-center gap-2 rounded-full px-3 py-2 transition hover:bg-zinc-100 sm:flex">
              🔔 <span className="text-xs font-medium">알림</span>
            </button>
            <button className="hidden items-center gap-2 rounded-full px-3 py-2 transition hover:bg-zinc-100 sm:flex">
              ✉️ <span className="text-xs font-medium">메시지</span>
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
              SJ
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-64 flex-col gap-6 lg:flex">
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
            <h2 className="mb-3 text-sm font-semibold text-zinc-600">바로가기</h2>
            <div className="space-y-2">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50"
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
            <h2 className="mb-3 text-sm font-semibold text-zinc-600">바로 찾는 공간</h2>
            <div className="space-y-3">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.label} className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl ${shortcut.color} opacity-90`} />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{shortcut.label}</p>
                    <p className="text-xs text-zinc-500">최근 활동 업데이트</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="flex-1 space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                SJ
              </div>
              <input
                className="h-11 flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white focus:ring-4"
                placeholder="무슨 생각을 하고 있나요?"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-600">
              <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">📷 사진/영상</span>
              <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">🎙️ 라이브</span>
              <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">😊 감정</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-700">스토리</h2>
              <button className="text-xs font-semibold text-indigo-600">모두 보기</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {stories.map((story) => (
                <div
                  key={story.name}
                  className="relative flex h-44 w-32 shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-100"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-80`} />
                  <div className="relative flex items-center gap-2 p-3 text-white drop-shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-indigo-700">
                      {story.name.slice(0, 1)}
                    </div>
                    <span className="text-sm font-semibold">{story.name}</span>
                  </div>
                  <p className="relative px-3 pb-3 text-xs font-medium text-white drop-shadow-sm">
                    {story.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100"
              >
                <header className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                      {post.author.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-zinc-900">{post.author}</p>
                        {post.badge ? (
                          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                            {post.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-zinc-500">
                        {post.role} · {post.time}
                      </p>
                    </div>
                  </div>
                  <button className="rounded-full px-2 py-1 text-lg text-zinc-400 transition hover:bg-zinc-100">
                    ···
                  </button>
                </header>

                <p className="mt-3 text-sm leading-6 text-zinc-800">{post.text}</p>

                {post.gradient ? (
                  <div className={`mt-4 h-64 rounded-xl bg-gradient-to-br ${post.gradient} shadow-inner`} />
                ) : null}

                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-zinc-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      👍 {post.likes}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      💬 {post.comments}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      ↗️ {post.shares}
                    </span>
                  </div>
                  <button className="rounded-full px-3 py-1 transition hover:bg-zinc-100">공유</button>
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-zinc-100 pt-3 text-sm font-semibold text-zinc-700">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 transition hover:bg-zinc-50">
                    👍 좋아요
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 transition hover:bg-zinc-50">
                    💬 댓글
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 transition hover:bg-zinc-50">
                    ↗️ 공유
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="hidden w-72 flex-col gap-4 xl:flex">
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-700">라이브 스트림</h2>
              <button className="text-xs font-semibold text-indigo-600">시청</button>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 text-white shadow-sm">
                <p className="text-sm font-semibold">오늘의 AMA</p>
                <p className="text-xs text-indigo-50">19:30 · 팀 빌딩 이야기</p>
              </div>
              <div className="rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-4 py-3 text-white shadow-sm">
                <p className="text-sm font-semibold">디자인 워크숍</p>
                <p className="text-xs text-amber-50">내일 오후 2시</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-700">접속 중 친구</h2>
              <span className="text-xs font-semibold text-zinc-500">채팅</span>
            </div>
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.name} className="flex items-center justify-between rounded-xl px-2 py-1 transition hover:bg-zinc-50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                        {contact.name.slice(0, 1)}
                      </div>
                      <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{contact.name}</p>
                      <p className="text-xs text-zinc-500">{contact.status}</p>
                    </div>
                  </div>
                  <button className="rounded-full px-2 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50">
                    대화
                  </button>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </main>
      <WriteComposer />
    </div>
  );
}
