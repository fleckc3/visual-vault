import { Container, Box } from "@mui/material";
import AppToolbar from "./components/navigation/AppToolbar";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppToolbar />
        <img
          src="/media/proposal_bg.png"
          style={{
            minWidth: "100%",
            height: "100%",
            position: "absolute",
            overflow: "hidden",
            bottom: 0,
            right: 0,
          }}
        />

        <Container sx={{ mt: "-56px" }}>
          <Box>
            {/* <CaptureForm /> */}
            <Home />
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
