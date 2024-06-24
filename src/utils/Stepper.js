import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = ["New Part Study", "Incomplete Part Study"];

const StepperComponent = ({ ps, handlePs }) => {
  const activeStep = ps ? 0 : 1;

  const handleStep = (step) => {
    handlePs({ target: { value: step === 0 } });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: activeStep === 0 ? "#1976d2" : "#e0e0e0",
            color: activeStep === 0 ? "#ffffff" : "#000000",
            mx: 1,
          }}
          onClick={() => handleStep(0)}
        >
          New Part Study
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: activeStep === 1 ? "#1976d2" : "#e0e0e0",
            color: activeStep === 1 ? "#ffffff" : "#000000",
            mx: 1,
          }}
          onClick={() => handleStep(1)}
        >
          Incomplete Part Study
        </Button>
      </Box>
    </Box>
  );
};

export default StepperComponent;
