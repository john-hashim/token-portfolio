// store/selectors/watchlistSelectors.ts
import type { RootState } from "@/store";

export const selectWatchlistTokens = (state: RootState) => 
  state.watchlist.tokens;

export const selectWatchlistLoading = (state: RootState) => 
  state.watchlist.isLoading;

export const selectWatchlistError = (state: RootState) => 
  state.watchlist.error;

export const selectWatchlistLastUpdated = (state: RootState) => 
  state.watchlist.lastUpdated;

export const selectWatchlistTokenCount = (state: RootState) => 
  state.watchlist.tokens.length;

export const selectIsWatchlistEmpty = (state: RootState) => 
  state.watchlist.tokens.length === 0;

// export const selectIsTokenInWatchlist = (state: RootState, tokenId: string) =>
//   state.watchlist.tokens.some((token) => token.id === tokenId);

// export const selectWatchlistTokenById = (state: RootState, tokenId: string) =>
//   state.watchlist.tokens.find((token) => token.id === tokenId);