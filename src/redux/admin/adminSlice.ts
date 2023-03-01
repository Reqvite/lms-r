import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { toast, ToastContent } from "react-toastify";
import { fetchUsers } from "./operations";

const initialState = {
  users: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<any>) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as ToastContent<unknown>);
      }),
});

export const authReducer = authSlice.reducer;
