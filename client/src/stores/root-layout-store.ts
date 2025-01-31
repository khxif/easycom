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
      if (!token) {
        set({ isAppInitialized: true });
        return null;
      }

      const user = await getAuthMe();
      if (!user) {
        set({ isAppInitialized: true });
        return null;
      }

      const { authenticate } = useAuthStore.getState();
      authenticate(user, token);
      set({ isAppInitialized: true });

      return user;
    } catch (error) {
      console.error(error);
      tokenStorage.clear();
      set({ isAppInitialized: true });
      return null;
    }
  },
}));
