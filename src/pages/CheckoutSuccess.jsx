import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NavBar from "../layout/NavBar";
import StepperComponent from "../layout/Stepper";

const CheckoutSuccessContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  marginTop: "2rem",
});

const CheckoutSuccessIcon = styled(CheckCircleIcon)({
  fontSize: "8rem",
  color: "#4caf50",
  marginBottom: "2rem",
});

const CheckoutSuccessMessage = styled(Typography)({
  marginBottom: "2rem",
});

const CheckoutSuccess = () => {
  return (
    <Grid container>
      <Grid item md={12} sm={12} xs={12}>
        <NavBar />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <StepperComponent />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <CheckoutSuccessContainer>
          <CheckoutSuccessIcon />
          <CheckoutSuccessMessage variant="h4">
            Comanda ta a fost plasată cu succes!
          </CheckoutSuccessMessage>
          <Typography variant="body1">
            Mulțumim pentru comandă. Aceasta a fost plasată și va fi procesată
            în cel mai scurt timp posibil.
          </Typography>
        </CheckoutSuccessContainer>
      </Grid>
    </Grid>
  );
};

export default CheckoutSuccess;
