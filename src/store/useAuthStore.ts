import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../constant/AxiosInstance';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (token: string, user: User) => {
        set({ token, user, isAuthenticated: true });
      },

      logout: async () => {
        try {
          if (get().token) {
            await api.post('/logout');
          }
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ token: null, user: null, isAuthenticated: false });
        }
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await api.get('/user');
          set({ user: response.data.data, isAuthenticated: true });
        } catch (error) {
          console.error('Session expired');
          set({ token: null, user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ token: state.token }), // only save token to storage
    }
  )
);
