import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { toast, ToastContent } from "react-toastify";
import { AdminState } from "types/types";
import { deleteUser, fetchAllUsersData, fetchUsers } from "./operations";

const initialState = {
  users: null,
  tests: null,
  isLoading: {
    tests: false,
    users: false,
  },
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AdminState>) =>
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading.users = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading.users = false;
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading.users = false;
        toast.error(action.payload as ToastContent<unknown>);
      })
      .addCase(fetchAllUsersData.pending, (state, action) => {
        state.isLoading.tests = true;
      })
      .addCase(fetchAllUsersData.fulfilled, (state, action) => {
        state.isLoading.tests = false;
        state.tests = action.payload.data.data;
      })
      .addCase(fetchAllUsersData.rejected, (state, action) => {
        state.isLoading.tests = false;
      })
      .addCase(deleteUser.pending, (state) => {})
      .addCase(deleteUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex(
          (user: any) => user._id === action.payload.userId
        );
        state.users.splice(idx, 1);
        const updatedTests = state.tests?.filter(
          ({ owner }: any) => owner !== action.payload.userId
        );
        state.tests = updatedTests;
        toast.success("Користувач  видалений");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        toast.error(action.payload as ToastContent<unknown>);
      }),
});

export const adminReducer = adminSlice.reducer;
