import { AuthState } from "types/types";

export const selectIsLoggedIn = ({ auth }: { auth: AuthState }) =>
  auth.isLoggedIn;

export const selectUser = ({ auth }: { auth: AuthState }) => auth.user;

export const selectRefreshing = ({ auth }: { auth: AuthState }) =>
  auth.isRefreshing;
