import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserTests = createAsyncThunk(
  "tests/fetchUserTests",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("api/tests/user");
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
    const resp = await axios.post("api/tests", test);
    return resp.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
