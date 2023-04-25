import { Box, createTheme, CssBaseline } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
// import { Item } from "../components/Item";
import { GeneralContext } from "../context/GeneralContext";
import Loading from "../layout/Loading";
import NavBar from "../layout/NavBar";
import { produseShop } from "../api";

const Item = lazy(() => import("../components/Item"));

export default function Home() {
  const [produse, setProduse] = useState([])
  const fetchProduse = async () => {
    const res = await produseShop()
    console.log(res);
    setProduse(res.produse)
  }
  useEffect(() => {
    fetchProduse()
  }, [])
  // localStorage.setItem('token', '')
  const { theme } = useContext(GeneralContext);
  const theme1 = createTheme({
    palette: { mode: theme },
  });
  return (
    <ThemeProvider theme={theme1}>
      <CssBaseline />
      <NavBar />
      <Suspense fallback={<Loading />}>
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
            {produse.map((produs, index) => (
              <Grid2 item xs={2} sm={4} md={4} key={index}>
                <Item numeProdus={produs.denumire} pret={produs.pret} poza={produs.imageURL} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Suspense>
    </ThemeProvider>
  );
}
