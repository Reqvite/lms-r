import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { login, refreshUser, register } from "./operations";

interface AuthPayload {
  user: { name: null; email: null };
  token: string;
}

export interface AuthState {
  user: { name: string | null; email: string | null };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
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
      .addCase(register.rejected, (state, action) => {})
      .addCase(login.pending, (state) => state)
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        const { user, token } = action.payload.data as AuthPayload;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {})
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
      }),
});

export const authReducer = authSlice.reducer;
