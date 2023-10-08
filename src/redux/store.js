import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { userReducer } from "./slices/user";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
