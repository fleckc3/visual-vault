import { Box, Toolbar, AppBar, Typography } from "@mui/material";
import VaultSvg from "../icons/VaultSvg";
import MenuIcon from "@mui/icons-material/Menu";

function AppToolbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ width: "25px", height: "25px" }}>
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
