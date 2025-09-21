import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Token, WatchlistState } from "../types";

const initialState: WatchlistState = {
  tokens: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{
        tokens: Token[];
      }>
    ) => {
      const newTokens = action.payload.tokens.filter(
        (newToken) =>
          !state.tokens.some(
            (existingToken) => existingToken.id === newToken.id
          )
      );

      state.tokens = [...state.tokens, ...newTokens];
    },
    removeTokens: (
      state,
      action: PayloadAction<{
        tokens: Token[];
      }>
    ) => {
      const tokenIdsToRemove = new Set(
        action.payload.tokens.map((token) => token.id)
      );
      state.tokens = state.tokens.filter(
        (token) => !tokenIdsToRemove.has(token.id)
      );
    },
    updateHoldings: (
      state,
      action: PayloadAction<{
        holding: number;
        tokenId: string;
        value: number;
      }>
    ) => {
      state.tokens = state.tokens.map((token) =>
        token.id === action.payload.tokenId
          ? { ...token, holdings: action.payload.holding, value: action.payload.value }
          : token
      );
    },
    removeToken: (
      state,
      action: PayloadAction<{
        tokenId: string;
      }>
    ) => {
      state.tokens = state.tokens.filter((token) =>
        token.id !== action.payload.tokenId
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetWatchlist: () => {
      return initialState;
    },
  },
});

export const { setTokens, removeTokens, setLoading, setError, resetWatchlist, updateHoldings, removeToken } =
  watchlistSlice.actions;

export const watchlistReducer = watchlistSlice.reducer;
