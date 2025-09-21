import { apiClient } from '@/lib/api';
import type { SearchInterface, Token, TokenSearchInterface, TrendingTokenResponse } from '../types';

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

export const getMarketData = async (coinIds: string) => {
    const { data: marketData } = await apiClient.get<Token[]>('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      sparkline: true,
      price_change_percentage: '24h',
      ids: coinIds,
    }
  });
  
  return marketData;
}