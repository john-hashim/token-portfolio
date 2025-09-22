export interface PortfolioState {
  totalBalance: number;
  isWalletConnected: boolean;
  chain: string | null;
  address: string | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null
}

export interface PortfolioItem {
    id: string;
    value: number;
    color: string
    symbol: string
}