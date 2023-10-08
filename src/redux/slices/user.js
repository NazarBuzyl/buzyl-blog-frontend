import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetUser = createAsyncThunk(
  "user/fetchGetUser",
  async (params) => {
    const { data } = await axios.get(`/user/${params}`);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // ---------------------------------------------------------------- Reducers for login ----------------------------------------------------------------
    [fetchGetUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchGetUser.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchGetUser.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const userReducer = userSlice.reducer;
