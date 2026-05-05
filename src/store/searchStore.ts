import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchResult {
  id: string;
  name: string;
  subName?: string;
  type: string;
  icon: any;
  path: string;
  status?: string;
}

interface SearchState {
  searchQuery: string;
  searchResults: SearchResult[];
  searchHistory: { query: string; timestamp: number }[];
  pendingSearchQuery: string | null;
  lastSearchContext: {
    query: string;
    results: SearchResult[];
  } | null;
  
  setSearchState: (query: string, results: SearchResult[]) => void;
  setPendingSearch: (query: string | null) => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  clearHistoryByScope: (scope: 'today' | 'week' | 'month' | 'all') => void;
  clearSearch: () => void;
  restoreLastSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      searchResults: [],
      searchHistory: [],
      pendingSearchQuery: null,
      lastSearchContext: null,

      setSearchState: (query, results) => {
        set({ searchQuery: query, searchResults: results });
      },

      setPendingSearch: (query) => {
        set({ pendingSearchQuery: query });
      },

      addToHistory: (query) => {
        if (!query || query.trim().length < 2) return;
        const currentHistory = get().searchHistory;
        const filteredHistory = currentHistory.filter(h => h.query.toLowerCase() !== query.toLowerCase());
        const newEntry = { query, timestamp: Date.now() };
        const newHistory = [newEntry, ...filteredHistory].slice(0, 50); // Increased history limit for "View All"
        set({ searchHistory: newHistory });
      },

      clearHistory: () => {
        set({ searchHistory: [] });
      },

      clearHistoryByScope: (scope) => {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        const oneMonth = 30 * oneDay; // Approximate

        const currentHistory = get().searchHistory;
        let newHistory = [];

        if (scope === 'today') {
          newHistory = currentHistory.filter(h => now - h.timestamp > oneDay);
        } else if (scope === 'week') {
          newHistory = currentHistory.filter(h => now - h.timestamp > oneWeek);
        } else if (scope === 'month') {
          newHistory = currentHistory.filter(h => now - h.timestamp > oneMonth);
        } else {
          newHistory = [];
        }

        set({ searchHistory: newHistory });
      },

      clearSearch: () => {
        set({ searchQuery: '', searchResults: [] });
      },

      restoreLastSearch: () => {
        const context = get().lastSearchContext;
        if (context) {
          set({ searchQuery: context.query, searchResults: context.results });
        }
      },
    }),
    {
      name: 'intelligence-search-storage',
      partialize: (state) => ({ 
        searchHistory: state.searchHistory,
        pendingSearchQuery: state.pendingSearchQuery
      }),
    }
  )
);
