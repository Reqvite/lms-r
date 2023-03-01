import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "tests/fetchAllUsersData",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("api/admin/users");
      return resp.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
