import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AuthState } from "types/types";

import { login, logOut, refreshUser, register } from "./operations";

interface AuthPayload {
  user: { name: null; email: null };
  token: string;
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
      .addCase(register.rejected, (state, action) => {
        toast.error(action.payload, {
          autoClose: 2000,
        });
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
        toast.error(action.payload, {
          autoClose: 2000,
        });
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
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.token = null;
      }),
});

export const authReducer = authSlice.reducer;
