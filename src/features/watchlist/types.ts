export interface Token {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    price_change_percentage_24h: number,
    holdings: number,
    sparkline_in_7d: SparklineIn7d;
    value: number
}

export interface SearchInterface {
    categories: unknown,
    coins: TokenSearchInterface[],
    exchanges: unknown,
    icos: unknown,
    nfts: unknown
}

export interface TokenSearchInterface {
    id: string,
    name: string,
    symbol: string,
    thumb: string 
}

interface SparklineIn7d {
  price: number[];
}

export interface WatchlistState {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null
}

export interface TrendingTokenResponse {
  coins: {
    item: TokenSearchInterface;
  }[];
}