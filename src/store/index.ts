import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userDataSlice";
import exerciseReducer from "./appStateSlice";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    appState: exerciseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
