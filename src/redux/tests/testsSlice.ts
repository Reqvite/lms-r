import { addTest, fetchUserTests } from "./operations";
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { TestsState } from "types/types";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TestsState>) =>
    builder
      .addCase(fetchUserTests.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data;
      })
      .addCase(fetchUserTests.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addTest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addTest.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const testsReduser = testsSlice.reducer;
