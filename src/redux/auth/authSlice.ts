import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { toast, ToastContent } from "react-toastify";
import { AuthState } from "types/types";

import { login, logOut, refreshUser, register, userAccess } from "./operations";

const initialState: AuthState = {
  user: { name: null, email: null, role: null, hasAccess: false },
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) =>
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, token } = action.payload.data;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as ToastContent<unknown>);
        action.payload = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload.data;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as ToastContent<unknown>);
        action.payload = null;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const { user } = action.payload.data;
        state.user = user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null, role: null, hasAccess: false };
        state.isLoggedIn = false;
        state.token = null;
        state.isLoading = false;
      })
      .addCase(logOut.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(userAccess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userAccess.fulfilled, (state) => {
        state.user.hasAccess = true;
        state.isLoading = false;
      })
      .addCase(userAccess.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addDefaultCase((state, action) => {
        if (action.error) {
          state.error = action.payload;
          toast.error(action.payload);
        }
      }),
});

export const authReducer = authSlice.reducer;
