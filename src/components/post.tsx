import { prisma } from "@/lib/prisma";

async function getThinks() {
  return prisma.think.findMany({ orderBy: { createdAt: "desc" } });
}

export default async function Post() {
    const thinks = await getThinks();
    return (
        <div className="space-y-4">
            {thinks.map((think) => (
              <article
                key={think.id}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100"
              >
                <header className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                      {think.author.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-zinc-900">{think.author}</p>
                        {think.badge ? (
                          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                            {think.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-zinc-500">
                        {think.role} · {think.time}
                      </p>
                    </div>
                  </div>
                  <button className="rounded-full px-2 py-1 text-lg text-zinc-400 transition hover:bg-zinc-100">
                    ···
                  </button>
                </header>

                <p className="mt-3 text-sm leading-6 text-zinc-800">{think.content}</p>

                {think.gradient ? (
                  <div className={`mt-4 h-64 rounded-xl bg-gradient-to-br ${think.gradient} shadow-inner`} />
                ) : null}

                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-zinc-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      👍 {think.agree}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      💬 {think.comments}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      ↗️ {think.shares}
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
    );
}