import React from "react";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

import styles from "./FullUserInfo.module.scss";

export const ProfileSkeleton = () => {
  return (
    <Paper elevation={3} className={styles.root}>
      <div className={styles.wrapper}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          style={{ marginBottom: 12 }}
        />
        <Skeleton variant="text" width={150} height={24} />
        <Skeleton variant="text" width={100} height={20} />
        <Skeleton variant="text" width={200} height={32} />
      </div>
    </Paper>
  );
};
