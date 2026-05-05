import { apiClient } from '@/services/apiClient';
import { Claim } from '@/config/types';

export const claimsApi = {
  getClaims: () => apiClient.get<Claim[]>('/claims'),
  getClaimById: (id: string) => apiClient.get<Claim>(`/claims/${id}`),
};
