import { Box, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

function Step2({ uploadData, setStep, setUploadData }) {
  const [progress, setProgress] = useState(0);
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
      () => {
        console.log("task completed");
      }
    );
  };

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        // Your code here
        setStep(3);
      }, 500);
    }
  }, [progress, setStep]);

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
            <Button
              sx={{ mt: "30px" }}
              startIcon={<ArrowBackIcon />}
              onClick={onBackClick}
            >
              Back
            </Button>
          </>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "",
            alignItems: "center",
          }}
        >
          <CircularProgress variant="determinate" value={progress} />
        </Box>
      </>
    </Box>
  );
}

export default Step2;
