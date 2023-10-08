import React from "react";
import styles from "./UserInfo.module.scss";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export const UserInfo = ({ _id, avatarURL, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Link to={`/user/${_id}`}>
        <Avatar
          className={styles.avatar}
          alt={fullName}
          src={
            avatarURL
              ? `${process.env.REACT_APP_API_URL}${avatarURL}`
              : "/noavatar.png"
          }
          sx={{ width: 30, height: 30 }}
        />
      </Link>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
