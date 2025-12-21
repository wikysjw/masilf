"use client";

import { FormEvent, useState } from "react";

export default function WriteComposer() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [draftContent, setDraftContent] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsComposerOpen(false);
    setDraftContent("");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => setIsComposerOpen(true)}
          className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black shadow-xl transition hover:translate-y-[-2px] hover:bg-white-900 focus:outline-none focus:ring-4 focus:ring-black/30"
        >
          ✏️ 내 생각
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-lg">+</span>
        </button>
      </div>

      {isComposerOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsComposerOpen(false)}
          />
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs uppercase text-black">
                  ✏️
                </span>
                새로운 생각 정리하기
              </div>
              <button
                type="button"
                onClick={() => setIsComposerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-zinc-500 transition hover:bg-zinc-100"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <div className="space-y-2">
                {/* <label className="text-xs font-semibold text-zinc-600">생각</label> */}
                <textarea
                  value={draftContent}
                  onChange={(event) => setDraftContent(event.target.value)}
                  className="h-36 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white focus:ring-4"
                  placeholder="지금 무슨 생각을 하고 있나요?"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 font-semibold text-zinc-700">📎 파일</span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 font-semibold text-zinc-700">😊 감정</span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 font-semibold text-zinc-700"># 태그</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="rounded-full px-4 py-2 font-semibold text-zinc-600 transition hover:bg-zinc-100"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-black/30"
                  >
                    전달
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
