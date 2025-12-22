"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FormEvent, useLayoutEffect, useMemo, useRef, useState } from "react";

export default function WriteComposer() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [draftContent, setDraftContent] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [emojiPosition, setEmojiPosition] = useState<{ top: number; left: number } | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const selectionRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });
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

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    const { start, end } = selectionRef.current;
    el.setSelectionRange(start, end);
  }, [draftContent]);

  const updateSelection = () => {
    const el = textareaRef.current;
    if (!el) return;
    const next = {
      start: el.selectionStart ?? 0,
      end: el.selectionEnd ?? 0,
    };
    selectionRef.current = next;
    setSelection(next);
  };

  const insertEmojiAtCursor = (emojiNative: string) => {
    const { start, end } = selectionRef.current;
    const from = Math.max(0, start);
    const to = Math.max(from, end);
    const nextContent = `${draftContent.slice(0, from)}${emojiNative}${draftContent.slice(to)}`;
    const cursor = from + emojiNative.length;
    selectionRef.current = { start: cursor, end: cursor };
    setSelection(selectionRef.current);
    setDraftContent(nextContent);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsComposerOpen(false);
    setDraftContent("");
    setIsEmojiOpen(false);
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
              setIsEmojiOpen(false);
              setEmojiPosition(null);
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
                  setIsEmojiOpen(false);
                  setEmojiPosition(null);
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
                    ref={textareaRef}
                    value={draftContent}
                    onSelect={updateSelection}
                    onKeyUp={updateSelection}
                    onClick={updateSelection}
                    onChange={(event) => {
                      const { selectionStart = 0, selectionEnd = 0, value } = event.target;
                      selectionRef.current = { start: selectionStart, end: selectionEnd };
                      setSelection(selectionRef.current);
                      setDraftContent(value);
                    }}
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
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <div className="relative flex items-center gap-2">
                  {/* <span className="rounded-full bg-zinc-100 px-3 py-1 font-semibold text-zinc-700">📎 파일</span> */}
                  <button
                    type="button"
                    ref={emojiButtonRef}
                    onMouseDown={(event) => {
                      // 포커스가 버튼으로 이동하며 selection이 초기화되는 것을 방지
                      event.preventDefault();
                      updateSelection();
                    }}
                    onClick={() => {
                      updateSelection();
                      const rect = emojiButtonRef.current?.getBoundingClientRect();
                      if (rect) {
                        setEmojiPosition({ top: rect.bottom + 8, left: rect.left });
                      }
                      setIsEmojiOpen((open) => !open);
                    }}
                    className="rounded-full bg-zinc-100 px-3 py-1 font-semibold text-zinc-700 transition hover:bg-zinc-200"
                  >
                    😊 감정
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsComposerOpen(false);
                      setIsEmojiOpen(false);
                    }}
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
        
          {isEmojiOpen && emojiPosition ? (
            <div
              className="fixed h-52 z-50 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-200"
              style={{ top: emojiPosition.top, left: emojiPosition.left }}
            >
              <Picker
                data={data}
                locale="ko"
                onEmojiSelect={(emoji: any) => {
                  if (!emoji?.native) return;
                  insertEmojiAtCursor(emoji.native);
                }}
                previewPosition="none"
                navPosition="bottom"
                searchPosition="none"
                skinTonePosition="none"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
