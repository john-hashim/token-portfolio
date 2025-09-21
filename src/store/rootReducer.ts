import { portfolioReducer } from "@/features/portfolio/store/portfolioSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    portfolio: portfolioReducer
})

export default rootReducer;
