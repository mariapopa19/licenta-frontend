import NavBar from "../layout/NavBar";
// import ItemCart from "../components/ItemCart";
import { useContext, useEffect, useState } from "react";
import { cosCumparaturi, stergeProdusCos } from "../api";

import { Grid, Typography, Divider, Button, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { GeneralContext } from "../context/GeneralContext";
import ItemCart from "../components/ItemCart";
import { useNavigate } from "react-router-dom";

const Root = styled("div")({
  flexGrow: 1,
  padding: (theme) => theme.spacing(2),
});

const Title = styled(Typography)({
  marginBottom: (theme) => theme.spacing(3),
});

const Total = styled(Typography)({
  fontWeight: "bold",
});

const EmptyCart = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "50vh",
  gap: (theme) => theme.spacing(2),
});

const CosCumparaturi = () => {
  const [produseCosCumparaturi, setProduseCosCumparaturi] = useState([]);
  const [total, setTotal] = useState(0);
  const { userId } = useContext(GeneralContext);
  const navigate = useNavigate();

  const fetchProduseCosCumparaturi = async () => {
    if (userId) {
      const res = await cosCumparaturi(userId);
      const totalInitial = res.reduce((acc, curr) => acc + curr.pret, 0);
      setProduseCosCumparaturi(res);
      setTotal(totalInitial);
    } else {
      navigate("/login", {replace: true});
      // ! eroare aici, de rezolvat 
    }
  };

  const handleStergeProdusCos = async (prodId) => {
    try {
      const res = await stergeProdusCos(userId, prodId);
      setProduseCosCumparaturi(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProduseCosCumparaturi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container>
      <Grid item md={12} sm={12} xs={12}>
        <NavBar />
      </Grid>
      <Grid item md={10} sm={10} xs={12} sx={{ mt: 10 }}>
        <Root>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {produseCosCumparaturi.length > 0 ? (
                <>
                  <Title variant="h4" component="h1">
                    Coș de cumpărături
                  </Title>
                  <Divider />
                  {produseCosCumparaturi.map((produs) => (
                    <div key={produs.id}>
                      <ItemCart
                        id={produs.id}
                        poza={produs.imageURL}
                        nume={produs.denumire}
                        pret={produs.pret}
                        cantitate={produs.produsCosCumparaturi.cantitate}
                        handleRemove={handleStergeProdusCos}
                      />
                      <Divider />
                    </div>
                  ))}
                  <div style={{ marginTop: "1rem" }}>
                    <Total variant="h6">Total: {total} lei</Total>
                  </div>
                </>
              ) : (
                <EmptyCart>
                  <ShoppingCartIcon sx={{ fontSize: 80 }} />
                  <Typography variant="h6" component="p">
                    Coșul tău este gol
                  </Typography>
                </EmptyCart>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4" component="h2" gutterBottom>
                Sumar comandă
              </Typography>
              <Divider />
              <div style={{ marginTop: "1rem" }}>
                <Typography variant="subtitle1">
                  Subtotal: {total} lei
                </Typography>
                <Typography variant="subtitle1">Livrare: 0 lei</Typography>
                <Divider
                  style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                />
                <Total variant="h6">Total comandă: {total} lei</Total>
              </div>
              <Button variant="contained" size="large" fullWidth>
                Finalizare comandă
              </Button>
            </Grid>
          </Grid>
        </Root>
      </Grid>
      {/* <Grid item md={8} sx={{m:2, mx: 10, my: 4, justifyContent: 'center'}} container>
        <Typography variant="h5" >Cos Cumpărături</Typography>
        <Grid item md={4}>

            <ItemCart />
            <Divider variant="middle" />
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default CosCumparaturi;
