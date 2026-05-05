import { MOCK_CLAIMS, MOCK_MEMBERS, MOCK_CASES } from '@/config/mockData';
import { Claim, Member, Case } from '@/config/types';

// Simulation of API client with delay
export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    await new Promise(r => setTimeout(r, 500));
    if (url.includes('/claims')) return MOCK_CLAIMS as T;
    if (url.includes('/members')) return MOCK_MEMBERS as T;
    if (url.includes('/cases')) return MOCK_CASES as T;
    throw new Error('Not found');
  }
};
