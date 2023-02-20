import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register: any = createAsyncThunk<{
  fullname: string;
  email: string;
  password: string;
}>("auth/register", async (credentials, thunkAPI) => {
  try {
    const resp = await axios.post("api/users/signup", credentials);
    setAuthHeader(resp.data.data.token);
    return resp.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const login: any = createAsyncThunk<{
  email: string;
  password: string;
}>("auth/login", async (credentials, thunkAPI: any) => {
  try {
    const resp = await axios.post("api/users/login", credentials);
    setAuthHeader(resp.data.data.token);
    return resp.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI: any) => {
    const { token } = thunkAPI.getState().auth;
    if (!token) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    setAuthHeader(token);
    try {
      const resp = await axios.get("api/users/current");
      return resp.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("api/users/logout");
    clearAuthHeader();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
