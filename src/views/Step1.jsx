import { Box, Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VideoCallIcon from "@mui/icons-material/VideoCall";

function Step1({ setStep, setUploadData }) {
  const validateFileSize = (type, file, preview) => {
    if (type === "Image") {
      const size = file.size;
      const fileSize = Math.round(size / 1024);

      if (fileSize > 20971520) {
        alert("Image too Big, please select a file less than 20mb");
        setUploadData({});
        return;
      } else {
        setUploadData({
          type,
          file,
          preview,
        });
        setStep(2);
      }
    }

    if (type === "Video") {
      const size = file.size;
      const maxSize = 200 * 1024 * 1024; // 200MB

      if (size > maxSize) {
        alert("The selected video exceeds the maximum file size of 200MB.");
        setUploadData({});
        return;
      } else {
        setUploadData({
          type,
          file,
          preview,
        });
        setStep(2);
      }
    }
  };
  const startFileUpload = (event, type) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    validateFileSize(type, file, preview);
    // setUploadData({
    //   type,
    //   file,
    //   preview,
    // });
    // setStep(2);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
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
          onChange={(e) => startFileUpload(e, "Image")}
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
          onChange={(e) => startFileUpload(e, "Video")}
        />
      </Button>
      {/* <Button
        variant="contained"
        fullWidth
        startIcon={<AddAPhotoIcon />}
        component="label"
        sx={{ my: "20px" }}
      >
        Record a voicee
        <input
          type="file"
          hidden
          capture="user"
          accept="audio/*"
          onChange={(e) => startFileUpload(e, 'Audio')}
        />
      </Button> */}
    </Box>
  );
}

export default Step1;
