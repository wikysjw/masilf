import { create } from "zustand";

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role?: string | null;
};

type AuthState = {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
