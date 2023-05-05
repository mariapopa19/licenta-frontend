import { Grid, Typography } from "@mui/material";
import { RoundedTextField } from "../TextField";
import { RoundedButton } from "../RoundedButton";
import { useState } from "react";

const DetaliiContulMeu = ({
  numeUtilizator,
  emailUtilizator,
  onClickSalveaza,
}) => {
  const [nume, setNume] = useState(numeUtilizator);
  const [email, setEmail] = useState(emailUtilizator);
  console.log(`nume: ${nume}, email: ${email}`);
  return (
    <Grid container>
      <Grid
        item
        container
        direction="column"
        spacing={3}
        sx={{ alignContent: "center" }}
      >
        <Grid item sx={{ width: { lg: 500, md: 450, sm: 400, xs: 350 } }}>
          <Typography variant="h6">Nume</Typography>
          <RoundedTextField
            fullWidth
            value={nume ? nume : numeUtilizator}
            onChange={(e) => {
              setNume(e.target.value);
            }}
          />
        </Grid>
        <Grid item sx={{ width: { lg: 500, md: 450, sm: 400, xs: 350 } }}>
          <Typography variant="h6">Email</Typography>
          <RoundedTextField
            fullWidth
            value={email ? email : emailUtilizator}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Grid>
        {/* <Grid item sx={{ width: {lg: 500, md: 450, sm: 400, xs: 350} }}>
          <Typography variant='h6'>Parola</Typography>
          <RoundedTextField fullWidth />
        </Grid> */}
        <Grid
          item
          sx={{
            display: "flex",
            width: { lg: 500, md: 450, sm: 400, xs: 350 },
            justifyContent: "right",
          }}
        >
          <RoundedButton
            onClick={() => {
              onClickSalveaza(nume, email);
              setNume(nume);
              setEmail(email);
            }}
            variant="contained"
            size="large"
          >
            Salvează
          </RoundedButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetaliiContulMeu;
