import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userDataSlice";
import fitnessReducer from "./fitnessStateSlice";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    fitnessState: fitnessReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
