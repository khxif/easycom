import { tokenStorage } from "@/lib/token-storage";
import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  authenticate: (user: User, token: string) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  isAuthenticated: false,
  user: null,

  authenticate(user: User, token: string) {
    tokenStorage.set(token);
    set({ isAuthenticated: true, user });
  },

  clearAuth() {
    tokenStorage.clear();
    set({ isAuthenticated: false, user: null });
  },

  logout() {
    get().clearAuth();
  },
}));
