/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { fetchPostsByFilter } from "../redux/slices/posts";
import { fetchGetUser } from "../redux/slices/user";
import FullUserInfo from "../components/FullUserInfo";

export const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const profile = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { id } = useParams();
  const isProfileLoading = profile.status !== "loaded";
  const isPostsLoading = posts.status === "loading";
  console.log(profile);

  React.useEffect(() => {
    dispatch(fetchPostsByFilter(`user/${id}`));
    dispatch(fetchGetUser(id));
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={4} item>
          {isProfileLoading ? (
            <FullUserInfo isLoading={true} />
          ) : (
            <FullUserInfo
              _id={profile.data._id}
              fullName={profile.data.fullName}
              userName={profile.data.email.split("@")[0]}
              avatarURL={profile.data.avatarURL}
              bio={profile.data.bio}
              isEditable={userData?._id === profile.data._id}
            />
          )}
        </Grid>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};
