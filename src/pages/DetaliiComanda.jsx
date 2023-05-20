import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Divider,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { cardPayment, cosCumparaturi, judeteRomania } from "../api";
import { useNavigate } from "react-router-dom";
import NavBar from "../layout/NavBar";
import StepperComponent from "../layout/Stepper";
import Loading from "../layout/Loading";

const CheckoutFormField = styled(TextField)({
  marginBottom: "1rem",
  width: 500,
});

const Total = styled(Typography)({
  fontWeight: "bold",
});

const DetaliiComandaCheckout = () => {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [total, setTotal] = useState(0);
  const [produse, setProduse] = useState([]);
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  const fetchJudeteRomania = async () => {
    try {
      const res = await judeteRomania();
      setCountries(res);
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };

  const fetchProduseCosCumparaturi = async () => {
    if (token) {
      try {
        const res = await cosCumparaturi(token);
        const totalInitial = res.reduce(
          (acc, curr) => acc + curr.pret * curr.produsCosCumparaturi.cantitate,
          0
        );
        setProduse(res);
        setTotal(totalInitial.toFixed(2));
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    } else {
      navigate("/login", { replace: true });
      // ! eroare aici, de rezolvat
    }
  };

  const handleFinalizeazaComanda = async () => {
    if (token) {
      try {
        const res = await cardPayment(
          token,
          address,
          city,
          county,
          selectedDate,
          selectedTime
        );
        if (res.url) {
          window.location.href = res.url;
        }
      } catch (e) {
        e.message === "jwt expired" || e.message === "jwt malformed"
          ? navigate("/login")
          : console.log(e.message);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProduseCosCumparaturi();
    fetchJudeteRomania();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item md={12} sm={12} xs={12}>
        <NavBar />
      </Grid>
      <Grid item md={12} sm={12} xs={12} >
        <StepperComponent />
      </Grid>
      <Grid item container sx={{ flexGrow: 1, mx: 10 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h2" gutterBottom>
            Detalii comandă
          </Typography>
          <Divider
            sx={{
              width: 900,
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
            px: 5,
          }}
        >
          <CheckoutFormField
            label="Oraș"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <CheckoutFormField
            label="Adresă"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormControl>
            <InputLabel id="jud">Județ</InputLabel>
            <Select
              labelId="jud"
              sx={{ marginBottom: "1rem", width: 500 }}
              value={county}
              label="Județ"
              onChange={(e) => setCounty(e.target.value)}
            >
              {countries.map((county, index) => (
                <MenuItem key={index} value={county.nume}>
                  {county.nume}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CheckoutFormField
            select
            label="Oră"
            variant="outlined"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <MenuItem value="9:00">9:00</MenuItem>
            <MenuItem value="12:00">12:00</MenuItem>
            <MenuItem value="15:00">15:00</MenuItem>
          </CheckoutFormField>
          <CheckoutFormField
            type="date"
            label="Data"
            variant="outlined"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" component="h2" gutterBottom>
            Sumar comandă
          </Typography>
          <Divider />
          {produse.length > 0 ? (
            <>
              <div style={{ marginTop: "1rem" }}>
                {produse.map((produs) => (
                  <div key={produs.id}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, my: 1.5 }}
                    >
                      {produs.denumire} - Cantitate:{" "}
                      {produs.produsCosCumparaturi.cantitate}
                    </Typography>
                    <Divider sx={{ width: 300 }} />
                  </div>
                ))}
                <Typography variant="subtitle1" sx={{ marginTop: "0.5rem" }}>
                  Livrare: 0 lei
                </Typography>
                <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
                <Total variant="h6">Total comandă: {total} lei</Total>
              </div>
              <Button
                onClick={() => handleFinalizeazaComanda()}
                variant="contained"
                size="large"
                //   fullWidth
              >
                Finalizare comandă
              </Button>
            </>
          ) : (
            <Loading />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetaliiComandaCheckout;
