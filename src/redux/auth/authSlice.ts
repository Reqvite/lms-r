import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { register } from "./operations";

interface RegisterPayload {
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
        const { user, token } = action.payload as RegisterPayload;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {}),
});

export const authReducer = authSlice.reducer;
