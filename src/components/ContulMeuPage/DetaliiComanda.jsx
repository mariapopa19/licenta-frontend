import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { comandaShop } from "../../api";

const OrderDetailsContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
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
});
const DetaliiComanda = () => {
  const { comandaId } = useParams();
  const navigate = useNavigate();
  const [comanda, setComanda] = useState({});
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  const calculateTotal = () => {
    let total = 0;
    comanda.produse.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("ro-RO", options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleTimeString("ro-RO", options);
  };

  const fetchComanda = async () => {
    try {
      const res = await comandaShop(token, comandaId);
      setComanda(res);
      console.log(comanda);
    } catch (e) {
      e.message === "jwt expired" ? navigate("/login") : console.log(e.message);
    }
  };

  useEffect(() => {
    fetchComanda();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E0E0E0",
        borderRadius: "16px",
        padding: "32px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "16px", color: "#212121" }}
      >
        Detalii comanda #{comandaId}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <OrderDetailsContainer>
          <OrderDetailsHeader variant="h6">Produs</OrderDetailsHeader>
          <OrderDetailsHeader variant="h6">Cantitate</OrderDetailsHeader>
          <OrderDetailsHeader variant="h6">Pret</OrderDetailsHeader>
          {comanda.produse.map((item) => (
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
          <OrderDetailsRow>
            <OrderDetailsName>Status comanda:</OrderDetailsName>
            <OrderDetailsPrice>{comanda.status}</OrderDetailsPrice>
          </OrderDetailsRow>
          <OrderDetailsRow>
            <OrderDetailsName>Adresa de livrare:</OrderDetailsName>
            <OrderDetailsPrice>{`${comanda.adresa}, ${comanda.oras}, ${comanda.judet}`}</OrderDetailsPrice>
          </OrderDetailsRow>
          <OrderDetailsRow>
            <OrderDetailsName>Ziua de livrare:</OrderDetailsName>
            <OrderDetailsPrice>
              {formatDate(comanda.ziLivrare)}
            </OrderDetailsPrice>
          </OrderDetailsRow>
          <OrderDetailsRow>
            <OrderDetailsName>Ora de livrare:</OrderDetailsName>
            <OrderDetailsPrice>
              {formatTime(comanda.intervalLivrare)}
            </OrderDetailsPrice>
          </OrderDetailsRow>
          <OrderDetailsRow>
            <OrderDetailsName>Modalitate de plata:</OrderDetailsName>
            <OrderDetailsPrice>Cash sau Card</OrderDetailsPrice>
          </OrderDetailsRow>
          <OrderDetailsTotal>Total: {calculateTotal()} lei</OrderDetailsTotal>
        </OrderDetailsContainer>
      </Box>
    </Box>
  );
};
export default DetaliiComanda;
