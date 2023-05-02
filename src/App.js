import { Container, Box } from "@mui/material";
import CaptureForm from "./components/CaptureForm";
import Home from "./views/Home";


function App() {
  return (
    <div className="App">
      <Container>
        <Box>
          {/* <CaptureForm /> */}
          <Home />
        </Box>
      </Container>
    </div>
  );
}

export default App;
