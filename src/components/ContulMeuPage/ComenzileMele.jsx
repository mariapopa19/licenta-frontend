import { Stack } from "@mui/material";
import ComandaItem from "./ComandaItem";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { comenziShop } from "../../api";

const ComenzileMele = () => {
  const [comenzi, setComenzi] = useState([]);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  const fetchComenziUtilizator = async () => {
    if (token) {
      const res = await comenziShop(token);
      setComenzi(res);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchComenziUtilizator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack spacing={5} direction="column" sx={{ px: { lg: 40 } }}>
      {comenzi.map((comanda) => (
        <ComandaItem
          key={comanda.id}
          id={comanda.id}
          data={comanda.createdAt}
          valoare={comanda.produse.reduce(
            (acc, curr) => acc + curr.pret * curr.produseComanda.cantitate,
            0
          )}
          status={comanda.status}
        />
      ))}
    </Stack>
  );
};

export default ComenzileMele;

export const loaderComenzileMele = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  if (token) {
    try {
      const res = await comenziShop(token);
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
    return redirect("/login");
  }
};
