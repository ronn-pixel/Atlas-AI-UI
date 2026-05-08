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
    const defaultName = email && email.trim() !== '' ? email : 'Agent 101';
    const mockUser = {
      id: '1',
      name: defaultName,
      email: email && email.trim() !== '' ? `${email}@atlasai.com` : 'agent101@atlasai.com',
      role: 'Agent',
      avatar: '', // removed unsplash
      gender: 'UNKNOWN', // set to generic
    };
    set({ user: mockUser, isAuthenticated: true, error: null });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
  clearError: () => set({ error: null }),
}));
