import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarURL, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={
          avatarURL
            ? `${process.env.REACT_APP_API_URL}${avatarURL}`
            : "/noavatar.png"
        }
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
