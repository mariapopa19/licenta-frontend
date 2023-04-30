import { Box, CssBaseline } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
// import { Item } from "../components/Item";
import { GeneralContext } from "../context/GeneralContext";
import Loading from "../layout/Loading";
import NavBar from "../layout/NavBar";
import { adaugaInCos, produseShop } from "../api";
import {  useNavigate } from "react-router-dom";

const Item = lazy(() => import("../components/Item"));

export default function Home() {
  // const produse = useLoaderData()
  const [produse, setProduse] = useState([]);
  const { produsAdaugatInCos, setProdusAdaugatInCos } =
    useContext(GeneralContext);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()
 
  const handleAdaugaCos = async (prodId) => {
    if (userId) {
      await adaugaInCos(userId, prodId);
      setProdusAdaugatInCos(produsAdaugatInCos + 1);
      navigate("/cos-cumparaturi");
    } else {
      navigate("/login");
    }
  };

  const handleDetaliiProdus = async (produsId) => {
    try {
      navigate(`/produs/${produsId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProduse = async () => {
    try {
      const res = await produseShop();
      console.log(res);
      setProduse(res.produse);
    } catch (e) {
      console.log(e);
      throw new Response("", {
        status: 404,
        statusText: "Not found",
      });
    }
  };
  useEffect(() => {
    fetchProduse();
  }, []);
  // localStorage.setItem('token', '')
  const { theme } = useContext(GeneralContext);
  // const theme1 = createTheme({
  //   palette: { mode: theme },
  // });
  return (
    <ThemeProvider theme={theme}>
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
                <Item
                  id={produs.id}
                  numeProdus={produs.denumire}
                  pret={produs.pret}
                  poza={produs.imageURL}
                  adaugareInCos={handleAdaugaCos}
                  vizualizareProdus={handleDetaliiProdus}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Suspense>
    </ThemeProvider>
  );
}


export const loaderProduse = async () => {
  try {
    const res = await produseShop();
    console.log(res);
    return res
  } catch (e) {
    console.log(e);
    throw new Response("", {
      status: 404,
      statusText: e,
    });
  }
}