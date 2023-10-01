import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import styles from "./Login.module.scss";

export default function AvatarFile({ setValue }) {
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload/avatar", formData);
      setImageUrl(data.url);
      setValue("avatarURL", data.url);
    } catch (err) {
      console.warn(err);
      alert("Error uploading");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
    setValue("avatarURL", "");
  };

  return (
    <>
      <div className={styles.avatar}>
        <Avatar
          src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
          sx={{ width: 100, height: 100 }}
          onClick={() => inputFileRef.current.click()}
        />
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
      </div>
      {imageUrl && (
        <>
          <div className={styles.deleteBtn}>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </>
  );
}
