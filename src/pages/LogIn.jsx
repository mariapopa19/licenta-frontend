import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { login } from "../api";
import { RoundedTextField } from "../components/TextField";
import { RoundedButton } from "../components/RoundedButton";
import { NavLink, useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import { CssBaseline, IconButton, InputAdornment, ThemeProvider, createTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";

const Titlu = styled(Typography)`
  font-family: "Lobster", cursive;
  font-weight: 700;
`;

const NavLinkCustom = styled(NavLink)`
  color: inherit;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;



export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [typeErrorParola, setTypeErrorParola] = useState(false);
  const [typeErrorEmail, setTypeErrorEmail] = useState(false);
  const [checked, setChecked] = useState(false);
  const { token, setToken, theme } = useContext(GeneralContext);
  const navigate = useNavigate();

  const newTheme = createTheme({
    ...theme.theme,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body:
            theme.mode === "dark"
              ? {
                  backgroundColor: "#ab5f7b",
                  backgroundImage: `linear-gradient(to right, #ab5f7b, #3b0322)`,
                }
              : {
                  backgroundColor: "#ffdde1",
                  backgroundImage: `linear-gradient(to right, #ffdde1, #ee9ca7)`,
                },
        },
      },
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTypeErrorEmail(false);
    setTypeErrorParola(false);
    try {
      const res = await login(email, pass);
      if (res.token) {
        setToken(res.token);
        if (checked) {
          localStorage.setItem("token", res.token);
        } else {
          sessionStorage.setItem("token", res.token);
        }
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      if (e.message === "Parola gresita!") {
        setTypeErrorParola(true);
      } else if (e.message === "Nu exista utilizator cu acest email.") {
        setTypeErrorEmail(true);
      }
    }
  };
  useEffect(() => {
    if (token !== "") {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <ThemeProvider theme={newTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: '8rem',
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <RoundedTextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={typeErrorEmail}
            helperText={typeErrorEmail ? "Email-ul nu este corect" : ""}
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
            error={typeErrorParola}
            helperText={typeErrorParola ? "Parola nu este corecta" : ""}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parolă"
            type={showPassword ? "text" : "password"}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ține-mă minte"
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
          <RoundedButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginTop: '2rem', marginBottom: '1rem' }}
          >
            Sign In
          </RoundedButton>
          <Grid container>
            <Grid item xs>
              <NavLinkCustom to="/parola-uitata" end>
                Ți-ai uitat parola?
              </NavLinkCustom>
            </Grid>
            <Grid item>
              <NavLinkCustom to="/signup" end>
                {"Nu ai cont deja? Înregistrează-te"}
              </NavLinkCustom>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
   </ThemeProvider>
  );
}
