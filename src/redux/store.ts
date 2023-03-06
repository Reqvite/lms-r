import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";

import { themeReducer } from "./theme/themeSlice";
import { combineReducers } from "redux";
import { adminReducer } from "./admin/adminSlice";
import { testsReducer } from "./tests/testsSlice";

const themePersistConfig = {
  key: "theme",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const userReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tests: testsReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
});

const newAdminReducer: any = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tests: testsReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
  admin: adminReducer,
});

const accessMiddleware =
  ({ getState }: any) =>
  (next: any) =>
  (action: any) => {
    const result = next(action);

    if (action.payload?.data?.user?.role === "admin") {
      localStorage.clear();
      store.replaceReducer(newAdminReducer);
    }

    return result;
  };

export const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(accessMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
