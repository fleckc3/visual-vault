import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { storage, db } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, push } from "firebase/database";
import { useState } from "react";

function Step2({ uploadData, setStep, setUploadData }) {
  const [progress, setProgress] = useState(0);
  const [uploadingMetaData, setUploadingMetaData] = useState(false);
  const { type, preview, file } = uploadData;

  const uploadFile = () => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        setUploadingMetaData(true);
        console.log("task completed");
        const mediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const vaultListRef = dbRef(db, "vaults");
        const newMediaRef = push(vaultListRef);
        set(newMediaRef, {
          name: file.name,
          src: mediaUrl,

          type,
        });
        setUploadingMetaData(false);
        setStep(3);
      }
    );
  };

  const onBackClick = () => {
    setUploadData({});
    setStep(1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "auto",
      }}
    >
      <>
        {progress === 0 && (
          <>
            <h1>{type} Preview</h1>
            {type === "Image" && (
              <img
                src={preview}
                alt={`${type}-preview`}
                style={{ maxWidth: "100%", maxHeight: "50vh" }}
              />
            )}

            {type === "Video" && (
              <video
                src={preview}
                controls
                style={{ maxWidth: "100%", maxHeight: "50vh" }}
              />
            )}
            <Box mt sx={{ width: "100%" }}>
              <Button fullWidth variant="contained" onClick={uploadFile}>
                Send {type}
              </Button>{" "}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: "30px" }}
                startIcon={<ArrowBackIcon />}
                onClick={onBackClick}
                color="secondary"
              >
                Back
              </Button>
            </Box>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={progress}
            sx={{ mb: 2 }}
          />

          <Typography color="secondary" display="block">
            {uploadingMetaData ? "Finishing..." : progress > 0 && `Sending ${type}...`}
          </Typography>
        </Box>
      </>
    </Box>
  );
}

export default Step2;
