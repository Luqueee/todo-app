import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import type { Action, Reducer } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import tasksReducer from "./reducers/tasksReducer";

const persistConfig = {
  key: "tasks-storage",
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  tasks: tasksReducer as Reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
