import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPostsPopularity = createAsyncThunk(
  "posts/fetchPostsPopularity",
  async () => {
    const { data } = await axios.get("/posts/popularity");
    return data;
  }
);

export const fetchPostsTag = createAsyncThunk(
  "posts/fetchPostsTag",
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
    // ---------------------------------------------------------------- Reducers for get posts ----------------------------------------------------------------
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // ---------------------------------------------------------------- Reducers for get posts - popularity ----------------------------------------------------------------
    [fetchPostsPopularity.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPostsPopularity.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsPopularity.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // ---------------------------------------------------------------- Reducers for get posts - tag ----------------------------------------------------------------
    [fetchPostsTag.pending]: (state) => {
      state.posts.status = "loading";
      state.tags.status = "loading";
    },
    [fetchPostsTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload.data;
      state.tags.items = action.payload.tags;
      state.posts.status = "loaded";
      state.tags.status = "loaded";
    },
    [fetchPostsTag.rejected]: (state) => {
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
