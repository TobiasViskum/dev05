import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userDataSlice";

export const store = configureStore({
  reducer: {
    userData: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["setAppData"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
