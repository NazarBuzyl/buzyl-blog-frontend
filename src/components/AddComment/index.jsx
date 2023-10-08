import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";

export const Index = ({
  setComments,
  comments,
  fullName,
  avatarURL,
  _id,
  postId,
}) => {
  const [text, setText] = React.useState("");

  const handleSendComment = async () => {
    try {
      const fields = {
        text: text,
        user: { fullName, avatarURL, _id },
      };

      setComments([...comments, fields]);
      await axios.post(`/comment/${postId}`, fields);

      setText("");
    } catch (error) {
      console.error("Error sending comment", error);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          alt={fullName}
          src={
            avatarURL
              ? `${process.env.REACT_APP_API_URL}${avatarURL}`
              : "/noavatar.png"
          }
        />
        <div className={styles.form}>
          <TextField
            label="Write Comment"
            variant="outlined"
            value={text}
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={!text}
            onClick={handleSendComment}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
