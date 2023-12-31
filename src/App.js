import React from "react";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "./components";
import {
  Home,
  FullPost,
  Registration,
  AddPost,
  Login,
  EditingProfile,
  Profile,
} from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { TagPage } from "./pages/TagPage";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    if (!isAuth && window.localStorage.getItem("token")) {
      dispatch(fetchAuthMe());
    }
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:id" element={<TagPage />} />
          <Route path="/user/:id/edit" element={<EditingProfile />} />
          <Route path="/user/:id" element={<Profile />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
