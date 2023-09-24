import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";

import styles from "./TagPage.module.scss";
import { Post } from "../../components/Post";
import { TagsBlock } from "../../components/TagsBlock";
import { CommentsBlock } from "../../components/CommentsBlock";
import { fetchPostsTag } from "../../redux/slices/posts";

export const TagPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { id } = useParams();

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPostsTag(id));
  }, [id]);

  return (
    <>
      <h1 className={styles.sectionHeader}>#{id}</h1>
      <Grid container spacing={4}>
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
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
