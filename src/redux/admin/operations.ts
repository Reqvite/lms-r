import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("api/admin/users");
      return resp.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAllUsersData = createAsyncThunk<
  any,
  {
    email?: string;
    limit?: string;
  }
>("admin/fetchAllUsersData", async ({ email, limit }, thunkAPI) => {
  try {
    const resp = await axios.get("api/admin/full-data", {
      params: {
        email,
        limit,
      },
    });
    return resp.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const deleteUser = createAsyncThunk<
  any,
  {
    id: string;
  }
>("admin/deleteUsers", async ({ id }, thunkAPI) => {
  try {
    const resp = await axios.delete(`api/admin/${id}`);

    return resp.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
