import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import { Fragment } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { comandaShop } from "../../api";

const OrderDetailsContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  paddingTop: "2rem",
  marginBottom: "1rem",
});

const OrderDetailsHeader = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "0.5rem",
});

const OrderDetailsRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "0.5rem",
});

const OrderDetailsName = styled(Typography)({
  marginRight: "1rem",
});

const OrderDetailsPrice = styled(Typography)({
  marginLeft: "1rem",
});

const OrderDetailsTotal = styled(Typography)({
  marginTop: "1rem",
  fontWeight: "bold",
  marginLeft: "auto",
});

const DetaliiComanda = () => {
  const { comandaId } = useParams();
  const comanda = useLoaderData();
  const produse = comanda.produse;

  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  const calculateTotal = () => {
    let total = 0;
    produse.forEach((item) => {
      total += item.pret * item.produseComanda.cantitate;
    });
    return total.toFixed(2);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 30,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "16px", color: "#212121" }}
      >
        Detalii comanda #{comandaId}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <OrderDetailsContainer elevation={0}>
          <OrderDetailsRow>
            <OrderDetailsHeader variant="h6">Produs</OrderDetailsHeader>
            <OrderDetailsHeader variant="h6">Cantitate</OrderDetailsHeader>
            <OrderDetailsHeader variant="h6">Pret</OrderDetailsHeader>
          </OrderDetailsRow>
          {produse.map((item) => (
            <Fragment key={item.id}>
              <OrderDetailsRow>
                <OrderDetailsName>{item.denumire}</OrderDetailsName>
                <OrderDetailsPrice>
                  {item.produseComanda.cantitate}
                </OrderDetailsPrice>
                <OrderDetailsPrice>{item.pret} lei</OrderDetailsPrice>
              </OrderDetailsRow>
            </Fragment>
          ))}

          <Divider sx={{ margin: "0.5rem 0" }} />
          <OrderDetailsRow sx={{ justifyContent: "flex-end" }}>
            <OrderDetailsTotal>Total: {calculateTotal()} lei</OrderDetailsTotal>
          </OrderDetailsRow>
        </OrderDetailsContainer>
        <Divider variant="middle" />
        <OrderDetailsContainer elevation={0}>
          <OrderDetailsHeader variant="h6">Detalii comanda</OrderDetailsHeader>
          <OrderDetailsRow>
            <OrderDetailsName>Data comanda:</OrderDetailsName>
            <OrderDetailsPrice>
              {comanda.ziLivrare} - {comanda.intervalLivrare}
            </OrderDetailsPrice>
          </OrderDetailsRow>
          <OrderDetailsRow>
            <OrderDetailsName>Status comanda:</OrderDetailsName>
            <OrderDetailsPrice>{comanda.status}</OrderDetailsPrice>
          </OrderDetailsRow>
          <OrderDetailsRow>
            <OrderDetailsName>Adresa livrare:</OrderDetailsName>
            <OrderDetailsPrice>{comanda.adresa}</OrderDetailsPrice>
          </OrderDetailsRow>
        </OrderDetailsContainer>
      </Box>
    </Box>
  );
};

export default DetaliiComanda;

export const loadComanda = async ({ params }) => {
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  const comandaId = params.comandaId;

  try {
    const res = await comandaShop(token, comandaId);
    return res;
  } catch (e) {
    throw new Response("", {
      status: 404,
      statusText: e.message,
    });
  }
};
