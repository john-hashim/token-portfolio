import { portfolioReducer } from "@/features/portfolio/store/portfolioSlice";
import { watchlistReducer } from "@/features/watchlist/store/watchlistSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    portfolio: portfolioReducer,
    watchlist: watchlistReducer
})

export default rootReducer;
