import React from "react";
import styles from "./UserInfo.module.scss";
import { Navigate } from "react-router-dom";

export const UserInfo = ({ _id, avatarURL, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Navigate to={`/profile/${_id}`}>
        <img
          className={styles.avatar}
          src={
            avatarURL
              ? `${process.env.REACT_APP_API_URL}${avatarURL}`
              : "/noavatar.png"
          }
          alt={fullName}
        />
      </Navigate>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
