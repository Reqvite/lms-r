import { AuthStateI } from "types/authTypes";

export const selectIsLoggedIn = ({ auth }: { auth: AuthStateI }) =>
  auth.isLoggedIn;

export const selectUser = ({ auth }: { auth: AuthStateI }) => auth.user;

export const selectRefreshing = ({ auth }: { auth: AuthStateI }) =>
  auth.isRefreshing;

export const selectIsLoading = ({ auth }: { auth: AuthStateI }) =>
  auth.isLoading;

export const selectError = ({ auth }: { auth: AuthStateI }) => auth.error;
