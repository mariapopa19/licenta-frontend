import { Button, Grid } from "@mui/material";
import NavBar from "../layout/NavBar";
import { useLoaderData, useNavigate } from "react-router-dom";
import { adaugaInCos, produsShop } from "../api";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

const RootBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  paddingTop: "100%",
  position: "relative",
}));

const ProductInfo = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
  marginLeft: theme.spacing(4),
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  marginBottom: theme.spacing(2),
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
}));

const ProductCompany = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.text.secondary,
}));

const DetaliiProdus = () => {
  const produs = useLoaderData();
  const { produsAdaugatInCos, setProdusAdaugatInCos } =
  useContext(GeneralContext);
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  // const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const handleAdaugaInCos = async (prodId) => {
    if (token) {
      await adaugaInCos(token, prodId);
      setProdusAdaugatInCos(produsAdaugatInCos + 1);
      navigate("/cos-cumparaturi");
    } else {
      navigate("/login");
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid
        item
        md={10}
        sm={12}
        xs={12}
        sx={{ justifyContent: "center", mx: { lg: 50, sm: 10 } }}
      >
        <RootBox>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ width: 500 }}>
                <ProductImage image={produs.imageURL} title={produs.denumire} />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <ProductInfo container>
                <Grid item xs={12}>
                  <ProductTitle variant="h1">{produs.denumire}</ProductTitle>
                  {/* <ProductDescription variant="body1">
                    {produs.descriere}
                  </ProductDescription> */}
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ pt: 5 }}>
                    <ProductPrice variant="h2">{produs.pret} lei</ProductPrice>
                    <ProductCompany variant="body1">
                      Vândut de {produs.firma.denumire}
                    </ProductCompany>
                  </Box>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={() => handleAdaugaInCos(produs.id)}>
                      Adaugă în coș
                    </Button>
                  </Box>
                </Grid>
                {/* <Grid item xs={12}>
              <Typography variant="h4">Product Features:</Typography>
              <ul>
                {produs.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Grid> */}
              </ProductInfo>
            </Grid>
          </Grid>
        </RootBox>
        <Grid item lg={8} direction='column' spacing={2} container sx={{px: 4}}>
          <Grid item>
            <ProductTitle variant="h2">Descriere</ProductTitle>
          </Grid>
          <Grid item>
            <ProductDescription variant="body1">
              {produs.descriere}
            </ProductDescription>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const loaderDetaliiProdus = async ({ params }) => {
  const { produsId } = params;
  try {
    const res = await produsShop(produsId);
    // console.log(res);
    return res;
  } catch (e) {
    throw new Error({
      status: 404,
      statusText: e,
    });
  }
};

export default DetaliiProdus;
