"use client";

import store, { persistor } from "./store";
import { Provider } from "react-redux";
import type React from "react";
import { PersistGate } from "redux-persist/integration/react";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
