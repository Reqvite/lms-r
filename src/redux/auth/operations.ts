import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthPayloadI } from "types/authTypes";

// axios.defaults.baseURL = "https://lms-api-eu.onrender.com";
//localhost:3000
//lms-api-eu.onrender.com

export const instance = axios.create({
  baseURL: "https://lms-api-eu.onrender.com",
});

const setToken = (token?: string) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = "";
};

export const register = createAsyncThunk<
  AuthPayloadI,
  {
    fullname: string;
    email: string;
    password: string;
  }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const resp: any = await instance.post("api/users/signup", credentials);
    setToken(resp.data.data.token);
    return resp.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const login = createAsyncThunk<
  AuthPayloadI,
  {
    email: string;
    password: string;
  }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const resp = await instance.post("api/users/login", credentials);
    setToken(resp.data.data.token);
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
    setToken(token);
    try {
      const resp = await instance.get("api/users/current");
      return resp.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const userAccess = createAsyncThunk(
  "auth/access",
  async (_, thunkAPI) => {
    try {
      await instance.get("api/users/admin");
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await instance.post("api/users/logout");
    setToken();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
