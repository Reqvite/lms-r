import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AuthState } from "types/types";

import { login, logOut, refreshUser, register, userAccess } from "./operations";

interface AuthPayload {
  user: { name: null; email: null; role: null; hasAccess: boolean };
  token: string;
}

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
      .addCase(register.pending, (state) => state)
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        const { user, token } = action.payload.data as AuthPayload;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(login.pending, (state) => state)
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        const { user, token } = action.payload.data as AuthPayload;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload);
      })
      .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        const { user } = action.payload.data as AuthPayload;
        state.user = user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null, role: null, hasAccess: false };
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(userAccess.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userAccess.fulfilled, (state, action) => {
        state.user.hasAccess = true;
        state.isLoading = false;
      })
      .addCase(userAccess.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const authReducer = authSlice.reducer;
