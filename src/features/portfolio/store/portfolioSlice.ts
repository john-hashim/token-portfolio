import type { PortfolioState } from "../types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: PortfolioState = {
  totalBalance: 0,
  isWalletConnected: false,
  chain: null,
  address: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setWalletInfo: (
      state,
      action: PayloadAction<{
        address: string;
        chain: string;
        isConnected: boolean;
      }>
    ) => {
      state.address = action.payload.address;
      state.chain = action.payload.chain;
      state.isWalletConnected = action.payload.isConnected;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetPortfolio: () => {
      return initialState;
    },
  },
});

export const {
    setWalletInfo,
    setLoading,
    setError,
    resetPortfolio
} = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer;
