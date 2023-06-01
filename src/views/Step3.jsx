import { useState } from "react";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function Step3({ type, setStep }) {
  const [open, setOpen] = useState(Boolean(type));
  // const [email, setEmail] = useState("");
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
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ mb: 3 }}
      >{`Thanks for sharing your ${type}!`}</Typography>
      {/* <Typography variant="p" textAlign="center" gutterBottom>
        Leave us your email to receive a pin code for full access to Colin and
        Lisa's Vow Vault
      </Typography>
      <Box component="form" sx={{ my: 2, width: "100%" }}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <Button variant="contained" fullWidth sx={{ my: 1 }}>
          Submit
        </Button>
      </Box> */}
      <Button
        sx={{ mt: 4 }}
        startIcon={<HomeIcon />}
        onClick={() => setStep(1)}
        color="secondary"
        variant="contained"
      >
        Home
      </Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={12000}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Upload success
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Step3;
