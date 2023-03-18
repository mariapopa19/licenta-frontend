import { Box, createTheme, CssBaseline } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { Item } from "../components/Item";
import { GeneralContext } from "../context/GeneralContext";
import ResponsiveAppBar from "../layout/NavBar";

export default function Home() {
  // localStorage.setItem('token', '')
  const { theme } = useContext(GeneralContext);
  const theme1 = createTheme({
    palette: { mode: theme },
  });
  return (
    <ThemeProvider theme={theme1}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Box sx={{ p: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction={{ xs: "column", sm: "row", md: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          {Array.from(Array(3)).map((_, index) => (
            <Grid2 item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}
