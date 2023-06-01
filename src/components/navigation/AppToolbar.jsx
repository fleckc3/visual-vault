import { Box, Toolbar, AppBar, Typography } from "@mui/material";

import VaultSvg from "../icons/VaultSvg";

function AppToolbar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: "30px", height: "30px" }}>
            <VaultSvg />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            The Vow Vault
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppToolbar;
