import { useState } from "react";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VideoCallIcon from "@mui/icons-material/VideoCall";

function Step1({ setStep, setUploadData, setShowVault }) {
  const [error, setError] = useState({
    hasError: false,
    errorMessage: "",
    type: "",
  });

  const { hasError, errorMessage } = error;

  const resetError = () => {
    setError({
      hasError: false,
      errorMessage: "",
      type: "",
    });
  };

  const getErrorMessage = (type, maxSize) => {
    return `Max ${type.toLowerCase()} size of ${
      maxSize / 1024 / 1024
    }MB exceeded! Please use a smaller ${type.toLowerCase()}.`;
  };

  const validateFileSize = (event, type) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    const size = file.size;

    if (type === "Image") {
      const maxSize = 20 * 1024 * 1024; // 15MB

      if (size > maxSize) {
        setError({
          hasError: true,
          errorMessage: getErrorMessage(type, maxSize),
          type,
        });
        setUploadData({});
      } else {
        resetError();
        setUploadData({
          type,
          file,
          preview,
        });
        setStep(2);
      }
    }

    if (type === "Video") {
      const maxSize = 200 * 1024 * 1024; // 200MB

      if (size > maxSize) {
        setError({
          hasError: true,
          errorMessage: getErrorMessage(type, maxSize),
          type,
        });
        setUploadData({});
      } else {
        resetError();
        setUploadData({
          type,
          file,
          preview,
        });
        setStep(2);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
      }}
    >
      <Box sx={{ mt: 10 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddAPhotoIcon />}
          component="label"
          sx={{ my: "20px" }}
        >
          Share image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => validateFileSize(e, "Image")}
          />
        </Button>
        <Button
          variant="contained"
          fullWidth
          startIcon={<VideoCallIcon />}
          component="label"
          sx={{ my: "20px" }}
        >
          Capture a Video
          <input
            type="file"
            hidden
            accept="video/*"
            onChange={(e) => validateFileSize(e, "Video")}
          />
        </Button>

        {/* <Button
          variant="contained"
          fullWidth
          startIcon={
            <Box sx={{ width: "30px", height: "30px" }}>
              <VaultSvg stoke="#9f5de2" />
            </Box>
          }
          onClick={() => setShowVault(true)}
          sx={{ my: "20px", color: "white", backgroundColor: "#6D7A5F" }}
        >
          View the Vault
        </Button> */}
      </Box>

      <Snackbar open={hasError} onClose={resetError} autoHideDuration={12000}>
        <Alert onClose={resetError} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Step1;
