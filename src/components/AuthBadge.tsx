"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthUser, useAuthStore } from "@/store/authStore";

type AuthBadgeProps = {
  initialUser: AuthUser | null;
};

export default function AuthBadge({ initialUser }: AuthBadgeProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (initialUser) {
      setUser(initialUser);
      return;
    }
    clearUser();
  }, [initialUser, setUser, clearUser]);

  console.log("AuthBadge user:", user);
  return (
    <div className="flex h-10 items-center gap-2 rounded-full bg-indigo-100 px-3 text-xs font-semibold text-indigo-700">
      {user?.name ?? user?.email ?? "Guest"}
      {user ? (
        <button
          className="text-[10px] text-indigo-700/80"
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" });
            clearUser();
            router.push("/login");
          }}
        >
          로그아웃
        </button>
      ) : null}
    </div>
  );
}
