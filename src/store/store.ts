import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../gameSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: { game: gameReducer },
});
