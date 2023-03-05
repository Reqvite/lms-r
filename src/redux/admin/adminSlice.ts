import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { toast, ToastContent } from "react-toastify";
import { deleteUser, fetchUsers } from "./operations";

const initialState = {
  users: null,
  isLoading: false,
};

export const adminSlice = createSlice({
  name: "admin",
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
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.users.findIndex(
          (user: any) => user._id === action.payload.userId
        );
        state.users.splice(idx, 1);
        toast.success("Користувач  видалений");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as ToastContent<unknown>);
      }),
});

export const adminReducer = adminSlice.reducer;
