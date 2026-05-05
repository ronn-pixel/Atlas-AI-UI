import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  gender?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  login: async (email, password) => {
    // Simulate API call
    if (email === 'agent101' && password === 'agent101') {
      const mockUser = {
        id: '1',
        name: 'Agent 101',
        email: 'agent101@atlasai.com',
        role: 'Agent',
        avatar: '', // removed unsplash
        gender: 'UNKNOWN', // set to generic
      };
      set({ user: mockUser, isAuthenticated: true, error: null });
    } else {
      set({ error: 'Invalid username or password' });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  clearError: () => set({ error: null }),
}));
