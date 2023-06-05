import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { creareUtilizator } from "../api/index";
import {
  CssBaseline,
  IconButton,
  InputAdornment,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import { RoundedTextField } from "../components/TextField";
import { RoundedButton } from "../components/RoundedButton";
import {  NavLink } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GeneralContext } from "../context/GeneralContext";

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

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const {theme} = useContext(GeneralContext)


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
    const data = await creareUtilizator(
      email,
      pass,
      `${firstName} ${lastName}`
    );
    console.log(data);
    localStorage.setItem("token", data.token);
  };

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
          <Titlu variant="h4">Creare cont</Titlu>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ marginTop: '3rem' }}
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
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <RoundedButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: '3rem', marginBottom: '1rem' }}
            >
              Înregistrare
            </RoundedButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLinkCustom to="/login" end>
                  Ai deja cont? Click aici
                </NavLinkCustom>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
  );
}
