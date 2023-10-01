import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchPostDelete } from "../../redux/slices/posts";

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
      return "Just now";
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    } else if (date.getDate() === now.getDate() - 1) {
      const formattedTime = date.toLocaleString([], {
        hour: "numeric",
        minute: "numeric",
      });
      return `Yesterday at ${formattedTime}`;
    } else {
      const formattedDate = date.toLocaleString([], {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return formattedDate;
    }
  };

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(fetchPostDelete(_id));
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={formatRelativeTime(createdAt)} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tags/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
