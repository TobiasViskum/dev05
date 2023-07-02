import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userDataSlice";
import exerciseReducer from "./exerciseStateSlice";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    exerciseState: exerciseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
