import { create } from "zustand";
import type { User } from "@/types/interfaces/user.interface";

import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  isAdmin: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles.includes("admin");
  },
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);
      // console.log({ data });
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
  register: async (email: string, password: string, fullName: string) => {
    try {
      const data = await registerAction(email, password, fullName);
      // console.log({ data });
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },
  checkAuthStatus: async () => {
    try {
      const { token, user } = await checkAuthAction();
      set({
        user,
        token,
        authStatus: "authenticated",
      });
      return true;
    } catch {
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },
}));
