import { Store, combineReducers, configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./darkMode.slice";

const rootReducer = combineReducers({
  darkMode: darkModeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store: Store<RootState> = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;

export default store;
