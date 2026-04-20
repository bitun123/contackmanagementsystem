"use client";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./slice/conatactSlice";
export const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
