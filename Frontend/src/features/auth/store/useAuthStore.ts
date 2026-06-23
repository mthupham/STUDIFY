// src/store/useAuthStore.ts
import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  loginAction: (credentials: { email: string; password: string }) => Promise<boolean>;
  logoutAction: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('accessToken') || null,
  isLoading: false,
  error: null,

  loginAction: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Khi nào có API của Kim Hằng thì mình đổi URL này sau, giờ để chạy thử
      if (credentials.email === "admin@gmail.com" && credentials.password === "123456") {
        const mockUser = { id: "1", username: "Thien Phuoc", email: credentials.email };
        localStorage.setItem('accessToken', 'mock-token-xyz');
        set({ user: mockUser, token: 'mock-token-xyz', isLoading: false });
        return true;
      } else {
        throw new Error("Tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  logoutAction: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, token: null });
  },
}));