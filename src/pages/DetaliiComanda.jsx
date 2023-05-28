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
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import { cardPayment, cosCumparaturi, judeteRomaniaLocal } from "../api";
import { useNavigate } from "react-router-dom";
import NavBar from "../layout/NavBar";
import StepperComponent from "../layout/Stepper";
import Loading from "../layout/Loading";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ro";
import { MobileTimePicker } from "@mui/x-date-pickers";
// import { StaticTimePicker } from "formik-mui-lab";

const CheckoutFormField = styled(TextField)({
  marginBottom: "1rem",
  width: 500,
});

const Total = styled(Typography)({
  fontWeight: "bold",
});


// !!! Cand vrei sa faci plata sa nu uiti sa dechizi terminalul cu ruta pentru webhook 'stripe listen --forward-to localhost:4000/shop/webhook'


const DetaliiComandaCheckout = () => {
  const [oras, setOras] = useState("");
  const [adresa, setAdresa] = useState("");
  const [judet, setJudet] = useState("");
  const [timpulSelectat, setTimpulSelectat] = useState(dayjs().locale("ro"));
  const [dataSelectata, setDataSelectata] = useState(dayjs().locale("ro"));
  const [total, setTotal] = useState(0);
  const [produse, setProduse] = useState([]);
  const navigate = useNavigate();
  const [judete, setJudete] = useState([]);
  const [orase, setOrase] = useState([]);

  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  const fetchJudeteRomania = async () => {
    try {
      const res = await judeteRomaniaLocal();
      setJudete(res);
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
      navigate("/login");
      // ! eroare aici, de rezolvat
    }
  };

  const handleJudetSelectat = (e) => {
    try {
      setJudet(e.target.value);
      const judetSelectat = judete.find(
        (judet) => e.target.value === judet.nume
      );
      setOrase(judetSelectat.localitati);
    } catch (e) {
      e.message === "jwt expired" || e.message === "jwt malformed"
        ? navigate("/login")
        : console.log(e.message);
    }
  };

  const handleFinalizeazaComanda = async () => {
    if (token) {
      try {
        if (adresa && oras && judet && dataSelectata && timpulSelectat) {
          const res = await cardPayment(
            token,
            adresa,
            oras,
            judet,
            dataSelectata.format("DD/MM/YYYY"),
            timpulSelectat.format("H:mm")
          );
          if (res.url) {
            window.location.href = res.url;
          }
        } else {
          alert("Nu ai completat toate datele!");
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
      <Grid item md={12} sm={12} xs={12}>
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
          <FormControl>
            <InputLabel id="jud">Județ</InputLabel>
            <Select
              labelId="jud"
              sx={{ marginBottom: "1rem", width: 500 }}
              value={judet}
              label="Județ"
              onChange={handleJudetSelectat}
            >
              {judete.map((county, index) => (
                <MenuItem key={index} value={county.nume} name={county.nume}>
                  {county.nume}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="oras">Oraș</InputLabel>
            <Select
              labelId="oras"
              sx={{ marginBottom: "1rem", width: 500 }}
              value={oras}
              label="Oraș"
              onChange={(e) => setOras(e.target.value)}
            >
              {orase.map((oras, index) => (
                <MenuItem key={index} value={oras.nume}>
                  {oras.nume}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CheckoutFormField
            label="Adresă"
            variant="outlined"
            value={adresa}
            onChange={(e) => setAdresa(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ro">
            <Stack spacing={2} width={500}>
              <DatePicker
                label="Data"
                value={dataSelectata}
                disablePast
                onChange={(e) => setDataSelectata(e)}
              />
              <MobileTimePicker
                disableOpenPicker={false}
                label="Ora"
                value={timpulSelectat}
                onChange={(e) => setTimpulSelectat(e)}
              />
            </Stack>
          </LocalizationProvider>
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
                type="submit"
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
