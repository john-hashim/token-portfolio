import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const loadState = () => {
  try {
    const state = localStorage.getItem('appState');
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (err) {
    console.log('Error in loading from Local storage', err)
  }
};

const saveState = (state: RootState) => {
  try {
    localStorage.setItem('appState', JSON.stringify(state));
  } catch (err) {
    console.log('Unable to save in Local storage', err)
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;