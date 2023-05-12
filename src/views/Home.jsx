// import React, { useState } from "react";
import { Container } from "@mui/material";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

function Home() {
  const [step, setStep] = useState(1);
  const [uploadData, setUploadData] = useState({});

  return (
    <Container>
      {step === 1 && <Step1 setStep={setStep} setUploadData={setUploadData} />}
      {step === 2 && (
        <Step2
          uploadData={uploadData}
          setStep={setStep}
          setUploadData={setUploadData}
        />
      )}
      {step === 3 && <div> step3</div>}
    </Container>
  );
}

export default Home;
