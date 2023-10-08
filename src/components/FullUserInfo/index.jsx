import React from "react";
import styles from "./FullUserInfo.module.scss";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { ProfileSkeleton } from "./Skeleton";

export default function FullUserInfo({
  _id,
  fullName,
  userName,
  avatarURL,
  bio,
  isLoading,
  isEditable,
}) {
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.avatarContainer}>
          <Avatar
            alt={fullName}
            src={
              avatarURL
                ? `${process.env.REACT_APP_API_URL}${avatarURL}`
                : "/noavatar.png"
            }
            sx={{ width: 100, height: 100 }}
          />
          {isEditable && (
            <div className={styles.editButtons}>
              <Link to={`/user/${_id}/edit`}>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Link>
            </div>
          )}
        </div>

        <div className={styles.fullName}>{fullName}</div>
        <div className={styles.userName}>@{userName}</div>
        <div className={styles.bio}>{bio}</div>
      </div>
    </div>
  );
}
