import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { testsReduser } from "./tests/testsSlice";
import { themeReducer } from "./theme/themeSlice";
import { combineReducers } from "redux";
import { adminReducer } from "./admin/adminSlice";

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
  admin: adminReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
