import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { creareUtilizator } from "../api/index";
import { createTheme, styled, ThemeProvider } from "@mui/material";
import { RoundedTextField } from "../components/TextField";
import { RoundedButton } from "../components/RoundedButton";
import { Link } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Popa Maria
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffdde1",
          backgroundImage: `linear-gradient(to right, #ffdde1, #ee9ca7)`,
        },
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

const Titlu = styled(Typography)`
  font-family: "Lobster", cursive;
  font-weight: 700;
`;

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await creareUtilizator(
      email,
      pass,
      `${firstName} ${lastName}`
    );
    console.log(data);
    localStorage.setItem("token", data.token);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="./images/1476408.avif"
            variant="square"
            sx={{ width: 60, height: 60 }}
          ></Avatar>
          <Titlu variant="h4">Creare cont</Titlu>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <RoundedTextField
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prenume"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RoundedTextField
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Nume de familie"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <RoundedTextField
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <RoundedTextField
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Parolă"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <RoundedButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Înregistrare
            </RoundedButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="login" relative="path">
                  Ai deja cont? Click aici
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
