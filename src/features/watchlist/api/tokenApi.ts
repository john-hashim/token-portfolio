import { apiClient } from '@/lib/api';
import type { SearchInterface, TokenSearchInterface, TrendingTokenResponse } from '../types';

export const searchTokens = async (query: string): Promise<TokenSearchInterface[]> => {
  const { data } = await apiClient.get<SearchInterface>('/search', {
    params: {
      query: query,
    }
  });
  return data.coins;
};

export const getTrendingTokens = async (): Promise<TokenSearchInterface[]> => {
  const { data } = await apiClient.get<TrendingTokenResponse>('/search/trending');
  return data.coins.map(coin => coin.item);
};