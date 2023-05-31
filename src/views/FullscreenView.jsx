import React from "react";

const FullscreenView = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "90%",
          maxHeight: "90%",
        }}
      ></Box>
    </Box>
  );
};

export default FullscreenView;
