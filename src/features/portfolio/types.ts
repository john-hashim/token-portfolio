export interface Holding {
  id: string;
  name: string;
  symbol: string;
  value: number;
  quantity: number;
  price: number;
  change24h?: number;
}

export interface PortfolioState {
  totalBalance: number;
  isWalletConnected: boolean;
  chain: string | null;
  address: string | null;
  holdings: Holding[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null
}