import { Box, Button, CircularProgress } from "@mui/material";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

function Step2({ uploadData, setStep }) {
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
                style={{ width: "100%", height: "auto" }}
              />
            )}

            {type === "Video" && (
              <video
                src={preview}
                controls
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <Box mt sx={{ width: "100%" }}>
              <Button fullWidth variant="contained" onClick={uploadFile}>
                Send {type}
              </Button>{" "}
            </Box>
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
