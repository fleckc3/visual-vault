import { Box, Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function Step1({ setStep, setUploadData }) {
  const startFileUpload = (event, type) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setUploadData({
      type,
      file,
      preview,
    });
    setStep(2);
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
          onChange={(e) => startFileUpload(e, 'Image')}
        />
      </Button>
      <Button
        variant="contained"
        fullWidth
        startIcon={<AddAPhotoIcon />}
        component="label"
        sx={{ my: "20px" }}
      >
        Capture a Video
        <input
          type="file"
          hidden
          accept="video/*"
          onChange={(e) => startFileUpload(e, 'Video')}
        />
      </Button>
      <Button
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
      </Button>
    </Box>
  );
}

export default Step1;
