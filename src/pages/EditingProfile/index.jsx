import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../../axios";

import styles from "./EditingProfile.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import AvatarFile from "../../components/AvatarFile";

export const EditingProfile = () => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const [fullName, setFullName] = React.useState("");
  const [avatarURL, setAvatarURL] = React.useState("");
  const navigate = useNavigate();
  console.log(userData);

  const onSubmit = async () => {
    try {
      const fields = {
        fullName,
        avatarURL,
      };

      await axios.patch("/auth/update_me", fields);

      navigate(`/profile/${userData._id}`);
    } catch (err) {
      console.warn(err);
      alert("Error updating user");
    }
  };
  React.useEffect(() => {
    if (isAuth) {
      setFullName(userData.fullName);
      if (userData.avatarURL) setAvatarURL(userData.avatarURL);
    }
  }, [userData]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={onSubmit}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Change Profile
        </Typography>
        <AvatarFile
          styles={styles}
          imageURL={avatarURL}
          setImageURL={setAvatarURL}
          uploadEndpoint="/upload/avatar"
          // onRemoveImage={() => { "Handle image deletion (e.g. reset in database)"}}
        />

        <TextField
          className={styles.field}
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Update
        </Button>
      </form>
    </Paper>
  );
};
