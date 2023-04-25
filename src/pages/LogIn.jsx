import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { login } from "../api";
import { RoundedTextField } from "../components/TextField";
import { RoundedButton } from "../components/RoundedButton";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { GeneralProvider } from "../context/GeneralContext";

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
export default function LogIn() {
  // const { token, setToken } = useContext(GeneralProvider);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [typeError, setTypeError] = useState(false)

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login(email, pass);
      if (res.token) {
        // setToken(res.token);
        localStorage.setItem('token',res.token);
        navigate("/");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
      setTypeError(true)
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('token')) {
      navigate('/');
    }
  }, [ navigate]);

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
          <Titlu component="h1" variant="h4">
            Log in
          </Titlu>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <RoundedTextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={typeError}
              helperText={typeError ? 'Email-ul nu este corect' : ''}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <RoundedTextField
              onChange={(e) => {
                setPass(e.target.value);
              }}
              error={typeError}
              helperText={typeError ? 'Parola nu este corecta': ''}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parolă"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ține-mă minte"
            />
            <RoundedButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </RoundedButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Ți-ai uitat parola?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/signup" end>
                  {"Nu ai cont deja? Înregistrează-te"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
