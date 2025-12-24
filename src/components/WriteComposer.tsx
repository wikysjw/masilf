"use client";

import { FormEvent, useMemo, useState } from "react";

export default function WriteComposer() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const highlightedContent = useMemo(() => {
    const escapeHtml = (value: string) =>
      value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const escaped = escapeHtml(draftContent);
    const withTags = escaped.replace(/#([^\s#]+)/g, `<span class="font-semibold text-indigo-700">#$1</span>`);
    return withTags.replace(/\n/g, "<br />");
  }, [draftContent]);

  const hashtags = useMemo(() => {
    const matches = draftContent.match(/#([^\s#]+)/g) || [];
    return Array.from(new Set(matches.map((tag) => tag.replace(/^#/, ""))));
  }, [draftContent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draftContent.trim()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        author: author.trim() || "익명",
        content: draftContent.trim(),
        hashtags,
        emotion: [],
      };
      const res = await fetch("/api/think", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("failed to create think");
      }
      setIsComposerOpen(false);
      setDraftContent("");
      setAuthor("");
    } catch (error) {
      console.error(error);
      alert("저장에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={() => {
              setIsComposerOpen(false);
            }}
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
                onClick={() => {
                  setIsComposerOpen(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-zinc-500 transition hover:bg-zinc-100"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <div className="space-y-2">
                {/* <label className="text-xs font-semibold text-zinc-600">생각</label> */}
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words rounded-xl border border-transparent px-4 py-3 text-sm leading-6 text-zinc-800"
                    dangerouslySetInnerHTML={{ __html: highlightedContent || "&nbsp;" }}
                  />
                  <textarea
                    value={draftContent}
                    onChange={(event) => setDraftContent(event.target.value)}
                    className="h-36 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-6 text-transparent caret-zinc-900 outline-none ring-indigo-200 transition focus:border-indigo-400 focus:bg-white focus:ring-4"
                    placeholder="지금 무슨 생각을 하고 있나요?"
                    required
                  />
                </div>
                {hashtags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1 text-xs font-semibold text-indigo-700">
                    {hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-indigo-50 px-3 py-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-end gap-2 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsComposerOpen(false);
                    }}
                    className="rounded-full px-4 py-2 font-semibold text-zinc-600 transition hover:bg-zinc-100"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-900 focus:outline-none focus:ring-4 focus:ring-black/30"
                  >
                    {isSubmitting ? "전달 중..." : "전달"}
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
