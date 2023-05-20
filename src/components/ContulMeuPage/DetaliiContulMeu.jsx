import { Grid, Typography } from "@mui/material";
import { RoundedTextField } from "../TextField";
import { RoundedButton } from "../RoundedButton";
import { useEffect, useState } from "react";
import { detaliiUtilizator, modificaDetaliiUtilizaor } from "../../api";
import { useNavigate } from "react-router-dom";

const DetaliiContulMeu = () => {
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  const navigate = useNavigate();
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');

  const onClickSalveaza = async (nume, email) => {
    if (token) {
      try {
        const res = await modificaDetaliiUtilizaor(token, nume, email);
        console.log(res);
        setNume(res.nume);
        setEmail(res.email);
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    } else {
      navigate("/login");
    }
  };

  const fetchDetaliiUtilizator = async () => {
    if (token) {
      try {
        const res = await detaliiUtilizator(token);
        setNume(res.nume);
        setEmail(res.email);
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchDetaliiUtilizator()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            value={nume}
            onChange={(e) => {
              setNume(e.target.value);
            }}
          />
        </Grid>
        <Grid item sx={{ width: { lg: 500, md: 450, sm: 400, xs: 350 } }}>
          <Typography variant="h6">Email</Typography>
          <RoundedTextField
            fullWidth
            value={email}
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
