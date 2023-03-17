import { Box, createTheme, CssBaseline } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ThemeProvider } from "styled-components";
import { Item } from "../components/Item";
import ResponsiveAppBar from "../layout/NavBar";

export default function Home() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Box sx={{ p:2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid2
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid2 display="flex" md={8}>
            <Item />
            <Item />
            <Item />
          </Grid2>
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}
