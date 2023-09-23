import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuthLogin = createAsyncThunk(
  "auth/fetchAuthLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchAuthRegister = createAsyncThunk(
  "auth/fetchAuthRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    // ---------------------------------------------------------------- Reducers for login ----------------------------------------------------------------
    [fetchAuthLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthLogin.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    // ---------------------------------------------------------------- Reducers for authorithation ----------------------------------------------------------------
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    // ---------------------------------------------------------------- Reducers for registration ----------------------------------------------------------------
    [fetchAuthRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
