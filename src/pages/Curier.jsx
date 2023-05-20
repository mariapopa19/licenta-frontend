import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
} from "@mui/material";
import NavBar from "../layout/NavBar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { comandaShip, comenziShip } from "../api";
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
  border: "2px solid rgba(0, 0, 0, 0.12)",
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

const TakeOrderButton = styled(Button)({
  fontSize: 16,
  fontWeight: "bold",
  backgroundColor: "#4caf50",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#388e3c",
  },
});
const ModalContainer = styled("div")({
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  border: "2px solid #000",
  borderRadius: 8,
  padding: 16,
  outline: "none",
  boxShadow: 24,
});

const ModalTitle = styled("h2")({
  fontSize: 24,
  marginBottom: 16,
});

const ModalDetails = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ModalLabel = styled("div")({
  fontWeight: "bold",
  marginBottom: 8,
});

const ModalValue = styled("div")({
  marginBottom: 16,
});

const ModalButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16,
});
const CloseButton = styled(Button)({
  marginLeft: 16,
});

const Curier = () => {
  const [searchText, setSearchText] = useState("Mangalia");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({ produse: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        const res = await comenziShip(token, searchText);
        console.log(res);
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

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleTakeOrder = (orderId) => {
    // aici ar trebui să adaugi logica pentru a prelua comanda cu id-ul orderId
    console.log(`Ai preluat comanda cu id-ul ${orderId}.`);
  };

  const handleOrderClick = async (comandaId) => {
    try {
      const res = await comandaShip(token, comandaId);
      setSelectedOrder(res);
      setIsModalOpen(true);
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                      Livrare până la:{order.intervalLivrare}
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
        <ModalDetaliiComanda
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
          selectedOrder={selectedOrder}
          handleTakeOrder={handleTakeOrder}
        />
      </Grid>
    </Grid>
  );
};

export const ModalDetaliiComanda = ({
  isModalOpen,
  handleCloseModal,
  selectedOrder,
  handleTakeOrder,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
    >
      {selectedOrder ? (
        <ModalContainer>
          <ModalTitle id="modal-title">
            Detalii comanda #{selectedOrder.id}
          </ModalTitle>
          <ModalDetails>
            <ModalLabel>Locatie:</ModalLabel>
            <OrderCity>{selectedOrder.oras}</OrderCity>
            <ModalLabel>Adresa:</ModalLabel>
            <ModalValue>{selectedOrder.adresa}</ModalValue>
            <ModalLabel>Ziua de livrate:</ModalLabel>
            <ModalValue>{selectedOrder.ziLivrare}</ModalValue>
            <ModalLabel>Ora de livrare:</ModalLabel>
            <ModalValue>{selectedOrder.intervalLivrare}</ModalValue>
            <ModalLabel>Produse:</ModalLabel>
            {selectedOrder.produse.map((produs) => (
              <ModalValue key={produs.id}>
                {produs.denumire} - {produs.produseComanda.cantitate} buc
              </ModalValue>
            ))}
          </ModalDetails>
          <ModalButtonContainer>
            <TakeOrderButton onClick={() => handleTakeOrder(selectedOrder.id)}>
              Ridica Comanda
            </TakeOrderButton>
            <CloseButton onClick={handleCloseModal}>Inchide</CloseButton>
          </ModalButtonContainer>
        </ModalContainer>
      ) : null}
    </Modal>
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
      const res = await comenziShip(token, "Mangalia");
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
