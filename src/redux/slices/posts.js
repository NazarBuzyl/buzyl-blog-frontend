import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPostsByFilter = createAsyncThunk(
  "posts/fetchPostsByFilter",
  async (filter = "") => {
    const { data } = await axios.get(`/posts/${filter}`);
    return data;
  }
);

export const fetchPostsByTag = createAsyncThunk(
  "posts/fetchPostsByTag",
  async (tagId) => {
    const { data } = await axios.get(`/tags/${tagId}`);
    const tags = data
      .map((obj) => obj.tags)
      .flat()
      .reduce((uniqueTags, tag) => {
        if (uniqueTags.length < 5 && !uniqueTags.includes(tag)) {
          uniqueTags.push(tag);
        }
        return uniqueTags;
      }, []);

    return { data, tags };
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchPostDelete = createAsyncThunk(
  "posts/fetchPostDelete",
  async (id) => axios.delete(`/posts/${id}`)
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // ---------------------------------------------------------------- Reducers for get posts by filter ----------------------------------------------------------------
    [fetchPostsByFilter.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPostsByFilter.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsByFilter.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // ---------------------------------------------------------------- Reducers for get posts - tag ----------------------------------------------------------------
    [fetchPostsByTag.pending]: (state) => {
      state.posts.status = "loading";
      state.tags.status = "loading";
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload.data;
      state.tags.items = action.payload.tags;
      state.posts.status = "loaded";
      state.tags.status = "loaded";
    },
    [fetchPostsByTag.rejected]: (state) => {
      state.posts.items = [];
      state.tags.items = [];
      state.posts.status = "error";
      state.tags.status = "error";
    },
    // ---------------------------------------------------------------- Reducers for tags ----------------------------------------------------------------
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // ---------------------------------------------------------------- Reducers for delete posts ----------------------------------------------------------------
    [fetchPostDelete.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
      state.posts.status = "loaded";
    },
  },
});

export const postsReducer = postsSlice.reducer;
