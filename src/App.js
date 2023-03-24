import { Container, Box } from "@mui/material";
// Import Parse minified version
import Parse from "parse/dist/parse.min.js";
import CaptureForm from "./components/CaptureForm";
import { PersonComponent } from "./components/PersonCompoent";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "xjhQ8CL1rOt1oOXfZhAr9dPDQTlVthkRLpgHCNcD";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "84kXIubrNF37Zg0qkWeOfN1OIMehzkba9Kr3hBRQ";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <div className="App">
      <Container>
        <Box>
          <CaptureForm />
        </Box>
      </Container>
    </div>
  );
}

export default App;
