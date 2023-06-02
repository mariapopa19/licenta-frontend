import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { comandaFinalizataShipper, comandaShip } from "../api";
import NavBar from "../layout/NavBar";

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: "400px",
  margin: "0 auto",
});

const CurierCoamndaPreluata = () => {
  const [comanda, setComanda] = useState({
    id: "",
    status: "",
    adresa: "",
    oras: "",
    judet: "",
    ziLivrare: "",
    intervalLivrare: "",
    produse: [],
  });
  const { comandaId } = useParams();
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  const navigate = useNavigate();

  const fetcuDetaliiComandaPreluata = async () => {
    try {
      const res = await comandaShip(token, comandaId);
      setComanda(res);
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };
  const handleFinalizeazaComanda = async () => {
    try {
      await comandaFinalizataShipper(token, comandaId);
      navigate("/curier");
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };

  useEffect(() => {
    fetcuDetaliiComandaPreluata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        xs={12}
        container
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FormContainer>
          <Typography variant="subtitle1">ID Comandă: {comanda.id}</Typography>
          <Typography variant="subtitle1">
            Locație: {`${comanda.oras}, ${comanda.judet}`}
          </Typography>
          <Typography variant="subtitle1">Adresă: {comanda.adresa}</Typography>
          <Typography variant="subtitle1">
            Ora și ziua livrării:{" "}
            {`${comanda.ziLivrare}, ${comanda.intervalLivrare}`}
          </Typography>
          <Typography variant="subtitle1">
            Starea comenzii: {comanda.status}
          </Typography>
          <Typography variant="h6">Produsele comenzii:</Typography>
          <List>
            {comanda.produse.map((produs) => (
              <ListItem>
                <ListItemAvatar>
                  <img
                    src={produs.imageURL}
                    alt={produs.denumire}
                    style={{ width: "48px", height: "48px" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={produs.denumire}
                  secondary={`Cantitate: ${produs.produseComanda.cantitate}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinalizeazaComanda}
          >
            Finalizează comanda
          </Button>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default CurierCoamndaPreluata;
