import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import NavBar from "../layout/NavBar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { comandaShip, comenziShip, comenziShipDupaOras, preiaComanda } from "../api";
import { redirect, useNavigate } from "react-router-dom";

const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 32,
});

const PageTitle = styled("h1")({
  fontSize: 32,
  marginBottom: 24,
  textAlign: "center",
});

const SearchBar = styled(TextField)({
  width: "70%",
  marginBottom: 32,
});

const OrdersList = styled(List)({
  width: "100%",
  maxWidth: 1000,
  marginBottom: 48,
});

const OrderItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  border: "2px solid",
  borderRadius: "10px",
  padding: 16,
  marginBottom: 16,
});

const OrderDetails = styled(ListItemText)({
  flexGrow: 1,
});

const OrderCity = styled("div")({
  fontWeight: "bold",
  marginBottom: 8,
});

const OrderAddress = styled("div")({
  marginBottom: 8,
});

const OrderDeliveryTime = styled("div")({
  fontStyle: "italic",
});

const DialogContainer = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  outline: "none",
});

const DialogTitle1 = styled(DialogTitle)({
  fontSize: 24,
  marginBottom: 16,
});

const DialogDetails = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const DialogLabel = styled("div")({
  fontWeight: "bold",
  marginBottom: 8,
});

const DialogValue = styled("div")({
  marginBottom: 16,
});

const DialogButtonContainer = styled(DialogActions)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16,
});

const CloseButton = styled(Button)({
  marginLeft: 16,
});

const Curier = () => {
  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({ produse: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  const fetchComenzi = async () => {
    if (token) {
      try {
        const res = await comenziShip(token);
        setOrders(res);
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    } else {
      navigate("/login");
    }
  };

  const onBlurSearch = async (event) => {
    if (searchText) {
      try {
        const res = await comenziShipDupaOras(token, searchText);
        setOrders(res);
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    } else {
      try {
        const res = await comenziShip(token);
        setOrders(res);
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    }
  };

  const handleSearch = async (event) => {
    setSearchText(event.target.value);
  };

  const handleTakeOrder = async (orderId) => {
    try {
      await preiaComanda(token, orderId)
      navigate(`${orderId}`)
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };

  const handleOrderClick = async (comandaId) => {
    try {
      const res = await comandaShip(token, comandaId);
      setSelectedOrder(res);
      setIsDialogOpen(true);
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetchComenzi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
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
        <PageContainer>
          <PageTitle>Comenzi disponibile</PageTitle>
          <SearchBar
            label="Cauta dupa locatia comenzii"
            variant="outlined"
            value={searchText}
            onBlur={onBlurSearch}
            onChange={handleSearch}
          />
          <OrdersList>
            {orders
              .filter(
                (order) =>
                  order.status === "confirmata" &&
                  order.oras.includes(searchText)
              )
              .map((order) => (
                <OrderItem
                  key={order.id}
                  onClick={() => handleOrderClick(order.id)}
                >
                  <OrderDetails>
                    <OrderCity>{order.oras}</OrderCity>
                    <OrderAddress>{order.adresa}</OrderAddress>
                    <OrderDeliveryTime>
                      Livrare până la: {order.intervalLivrare}
                    </OrderDeliveryTime>
                  </OrderDetails>
                  {/* <TakeOrderButton
                    variant="contained"
                    onClick={() => handleTakeOrder(order.id)}
                  >
                    Preia comanda
                  </TakeOrderButton> */}
                </OrderItem>
              ))}
          </OrdersList>
        </PageContainer>
      </Grid>
      <Grid item>
        <DialogDetaliiComanda
          open={isDialogOpen}
          handleCloseDialog={handleCloseDialog}
          selectedOrder={selectedOrder}
          handleTakeOrder={handleTakeOrder}
        />
      </Grid>
    </Grid>
  );
};

export const DialogDetaliiComanda = ({
  open,
  handleCloseDialog,
  selectedOrder,
  handleTakeOrder,
}) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      {selectedOrder ? (
        <DialogContainer>
          <DialogTitle1 id="dialog-title">
            Detalii comanda #{selectedOrder.id}
          </DialogTitle1>
          <DialogDetails>
            <DialogLabel>Locatie:</DialogLabel>
            <DialogValue>{selectedOrder.oras}</DialogValue>
            <DialogLabel>Adresa:</DialogLabel>
            <DialogValue>{selectedOrder.adresa}</DialogValue>
            <DialogLabel>Ziua de livrare:</DialogLabel>
            <DialogValue>{selectedOrder.intervalLivrare}</DialogValue>
            <DialogLabel>Produse:</DialogLabel>
            {/* <DialogValue> */}
            <List>
              {selectedOrder.produse.map((produs, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${produs.denumire} - ${produs.produseComanda.cantitate}`}
                  />
                </ListItem>
              ))}
            </List>
            {/* </DialogValue> */}
          </DialogDetails>
          <DialogButtonContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleTakeOrder(selectedOrder.id)}
            >
              Preia comanda
            </Button>
            <CloseButton color="secondary" onClick={handleCloseDialog}>
              Inchide
            </CloseButton>
          </DialogButtonContainer>
        </DialogContainer>
      ) : (
        <div>Comanda nu a putut fi gasita.</div>
      )}
    </Dialog>
  );
};

export default Curier;

export const loaderCurier = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  if (token) {
    try {
      const res = await comenziShip(token);
      return res;
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? redirect("/login")
        : console.log(e.message);
    }
  } else {
    redirect("/login");
  }
  return null;
};
