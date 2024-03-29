import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "redux/auth/operations";

export const fetchAllTests = createAsyncThunk(
  "tests/fetchAllTests",
  async (_, thunkAPI) => {
    try {
      const resp = await instance.get("api/tests");
      return resp.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserTests = createAsyncThunk(
  "tests/fetchUserTests",
  async (_, thunkAPI) => {
    try {
      const resp = await instance.get("api/tests/user-tests");
      return resp.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addTest = createAsyncThunk<
  any,
  {
    results: any;
    testTitle: string;
    email: string | null;
    cipher: string;
  }
>("tests/addTest", async (test, thunkAPI) => {
  try {
    const resp = await instance.post("api/tests", test);
    return resp.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
