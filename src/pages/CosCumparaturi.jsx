import NavBar from "../layout/NavBar";
import { useContext, useEffect, useState } from "react";
import {
  adaugaInCos,
  cosCumparaturi,
  scoateProdusCos,
  stergeProdusCos,
} from "../api";

import { Grid, Typography, Divider, Button, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ItemCart from "../components/ItemCart";
import { redirect, useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import StepperComponent from "../layout/Stepper";

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
  const { produsAdaugatInCos, setProdusAdaugatInCos } =
    useContext(GeneralContext);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  const fetchProduseCosCumparaturi = async () => {
    if (token) {
      try {
        const res = await cosCumparaturi(token);
        const totalInitial = res.reduce(
          (acc, curr) => acc + curr.pret * curr.produsCosCumparaturi.cantitate,
          0
        );
        setProduseCosCumparaturi(res);
        setTotal(totalInitial.toFixed(2));
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login", { replace: true })
          : console.log(e.message);
      }
    } else {
      navigate("/login", { replace: true });
      // ! eroare aici, de rezolvat
    }
  };
  // console.log(produseCosCumparaturi);

  const handleStergeProdusCos = async (prodId, index) => {
    try {
      if (token) {
        const res = await stergeProdusCos(token, prodId);
        const totalNou = res.reduce(
          (acc, curr) => acc + curr.pret * curr.produsCosCumparaturi.cantitate,
          0
        );
        produseCosCumparaturi.splice(index, 1);
        setProdusAdaugatInCos(produsAdaugatInCos - 1);
        setProduseCosCumparaturi([...res]);
        setTotal(totalNou.toFixed(2));
      }
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };
  const handleIncrement = async (produsId) => {
    if (token) {
      try {
        await adaugaInCos(token, produsId);
        const res = await cosCumparaturi(token);
        const totalNou = res.reduce(
          (acc, curr) => acc + curr.pret * curr.produsCosCumparaturi.cantitate,
          0
        );
        setProdusAdaugatInCos(produsAdaugatInCos + 1);
        setProduseCosCumparaturi([...res]);
        setTotal(totalNou.toFixed(2));
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    }
  };

  const handleDecrement = async (produsId) => {
    if (token) {
      try {
        await scoateProdusCos(token, produsId);
        const res = await cosCumparaturi(token);
        const totalNou = res.reduce(
          (acc, curr) => acc + curr.pret * curr.produsCosCumparaturi.cantitate,
          0
        );
        setProdusAdaugatInCos(produsAdaugatInCos - 1);
        setProduseCosCumparaturi([...res]);
        setTotal(totalNou.toFixed(2));
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    }
  };

  const handleFinalizeazaComanda = async () => {
    if (token) {
      navigate("/detalii-comanda");
    } else {
      navigate("/login");
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
      <Grid item md={12} sm={12} xs={12}>
        <StepperComponent />
      </Grid>
      <Grid item md={10} sm={10} xs={12} sx={{ mt: 10, mx: 10 }}>
        <Root>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {produseCosCumparaturi.length > 0 ? (
                <>
                  <Title variant="h4" component="h1">
                    Coș de cumpărături
                  </Title>
                  <Divider />
                  {produseCosCumparaturi.map((produs, index) => (
                    <div key={produs.id}>
                      <ItemCart
                        index={index}
                        id={produs.id}
                        poza={produs.imageURL}
                        nume={produs.denumire}
                        pret={produs.pret}
                        cantitate={produs.produsCosCumparaturi.cantitate}
                        handleRemove={handleStergeProdusCos}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
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
                <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
                <Total variant="h6">Total comandă: {total} lei</Total>
              </div>
              <Button
                onClick={() => handleFinalizeazaComanda()}
                variant="contained"
                size="large"
                fullWidth
              >
                Pasul urmator
              </Button>
            </Grid>
          </Grid>
        </Root>
      </Grid>
      <Divider />
      {/* <Grid item md={10} sm={10} xs={12} sx={{ mt: 10, mx: 10 }}>
        <DetaliiComanda />
      </Grid> */}
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

export const loaderCosCumparaturi = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  if (token) {
    try {
      const res = await cosCumparaturi(token);
      return res;
    } catch (e) {
      if (e.message === "jwt expired" || e.message === "jwt malformed") {
        return redirect("/login");
      } else {
        throw new Response("", {
          status: 404,
          statusText: e.message,
        });
      }
    }
  } else {
    redirect("/login");
  }
};
