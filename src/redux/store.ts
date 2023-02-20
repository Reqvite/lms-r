import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { testsReduser } from "./tests/testsSlice";
import { themeReducer } from "./theme/themeSlice";
import { combineReducers } from "redux";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
const themePersistConfig = {
  key: "theme",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tests: testsReduser,
  theme: persistReducer(themePersistConfig, themeReducer),
});

const appReducer = (state: any, action: any) => {
  if (action.type === "auth/logout/fulfilled") {
    state = undefined;
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
