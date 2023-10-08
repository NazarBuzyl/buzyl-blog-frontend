import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { selectIsAuth } from "../redux/slices/auth";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [commentsData, setCommentsData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const userData = useSelector((state) => state.auth.data);
  const isAuth = useSelector(selectIsAuth);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((req) => {
        setData(req.data);
        setCommentsData(req.data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error with GET POST");
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Post isLoading={isLoading} isFullPost></Post>
        <CommentsBlock />
      </>
    );
  }

  return (
    <>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={commentsData.length}
        tags={data.tags}
        isEditable={userData?._id === data.user._id}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={commentsData} isLoading={isLoading}>
        {isAuth && (
          <Index
            setComments={setCommentsData}
            comments={commentsData}
            {...userData}
            postId={data._id}
          />
        )}
      </CommentsBlock>
    </>
  );
};
