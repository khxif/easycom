import { getAuthMe } from "@/fetchers/auth";
import { tokenStorage } from "@/lib/token-storage";
import { create } from "zustand";
import { useAuthStore } from "./auth-store";

interface RootLayoutStore {
  isAppInitialized: boolean;
  initApp: () => void;
}

export const useRootLayoutStore = create<RootLayoutStore>()((set) => ({
  isAppInitialized: false,
  async initApp() {
    try {
      const token = tokenStorage.get();
      if (!token) return;

      const user = await getAuthMe();
      if (!user) return;

      const { authenticate } = useAuthStore.getState();
      authenticate(user, token);
      set({ isAppInitialized: true });

      return user;
    } catch (error) {
      console.log(error);
    }
  },
}));
