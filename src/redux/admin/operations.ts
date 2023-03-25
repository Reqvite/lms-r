import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "redux/auth/operations";

export const fetchUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, thunkAPI) => {
    try {
      const resp = await instance.get("api/admin/users");
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
    startDate?: Date | null;
    endDate?: Date | null;
  }
>(
  "admin/fetchAllUsersData",
  async ({ email, startDate, endDate }, thunkAPI) => {
    try {
      const resp = await instance.get("api/admin/full-data", {
        params: {
          email,
          startDate,
          endDate,
        },
      });
      return resp.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk<
  any,
  {
    id: string;
  }
>("admin/deleteUsers", async ({ id }, thunkAPI) => {
  try {
    const resp = await instance.delete(`api/admin/${id}`);

    return resp.data.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
