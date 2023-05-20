import React from "react";
import { useLocation } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  //   Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const StepperContainer = styled(Box)({
  marginTop: "3rem",
  marginBottom: "3rem",
  marginLeft: '10rem',
  marginRight: '10rem'
});

const steps = [
  { label: "Cos cumparaturi", path: "/cos-cumparaturi" },
  { label: "Livrare", path: "/detalii-comanda" },
  { label: "Plata", path: "/checkout-success" },
];

const StepperComponent = () => {
  const location = useLocation();

  return (
    <StepperContainer>
      <Stepper
        activeStep={
          location.pathname === steps[steps.length - 1].path
            ? steps.length + 1
            : steps.findIndex((step) => step.path === location.pathname)
        }
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography variant="body1">{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
};

export default StepperComponent;
