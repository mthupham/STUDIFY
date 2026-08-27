import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  hasCompletedOnboarding?: boolean;
  currentLevel?: string;
}

interface AuthResponse {
  accessToken: string;
  data: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  loginAction: (credentials: { email: string; password: string }) => Promise<boolean>;
  setAuthSession: (user: User, token: string) => void;
  logoutAction: () => void;
  markOnboardingCompleted: () => void; 
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const storedUser = localStorage.getItem('authUser');

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem('accessToken') || null,
  isLoading: false,
  error: null,

  loginAction: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.post<AuthResponse>(`${apiBaseUrl}/auth/login`, credentials);
      const { accessToken, data: user } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('authUser', JSON.stringify(user));
      set({ user, token: accessToken, isLoading: false });
      return true;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : null;
      set({
        error: Array.isArray(message) ? message.join(', ') : message || 'Tài khoản hoặc mật khẩu không đúng!',
        isLoading: false,
      });
      return false;
    }
  },

  setAuthSession: (user, token) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    set({ user, token, error: null });
  },

  logoutAction: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authUser');
    set({ user: null, token: null });
  },

  markOnboardingCompleted: () => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, hasCompletedOnboarding: true };
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },
}));