import { CssBaseline } from "@mui/material";
import { Box, Container, createTheme } from "@mui/system";
import { ThemeProvider } from "styled-components";

const theme = createTheme({
  palette: {
    background: { default: "linear-gradient(to right, #ffdde1, #ee9ca7)" },
  },
});
const Signup_Test = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"></Container>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(to right, #ffdde1, #ee9ca7)",
        }}
      ></Box>
    </ThemeProvider>
  );
};

export default Signup_Test;
