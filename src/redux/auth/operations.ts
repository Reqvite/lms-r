import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register: any = createAsyncThunk<
  { fullname: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const resp = await axios.post("api/users/signup", credentials);
    // setAuthHeader(resp.data.token);
    return resp.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});
