import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../axios";

export default function AvatarFile({
  styles,
  setImageURL,
  imageURL,
  onRemoveImage,
  uploadEndpoint,
}) {
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post(uploadEndpoint, formData);
      setImageURL(data.url);
    } catch (err) {
      console.warn(err);
      alert("Error uploading");
    }
  };

  const onClickRemoveImage = () => {
    setImageURL("");
    if (typeof onRemoveImage === "function") {
      onRemoveImage();
    }
  };

  return (
    <>
      <div className={styles.avatar}>
        <Avatar
          src={`${process.env.REACT_APP_API_URL}${imageURL}`}
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
      {imageURL && (
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
