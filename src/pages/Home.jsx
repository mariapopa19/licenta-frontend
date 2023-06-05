import { Tab, Tabs } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
// import { Item } from "../components/Item";
import NavBar from "../layout/NavBar";
import { categoriiProduseShop } from "../api";
import { NavLink, Outlet, useParams } from "react-router-dom";

export default function Home() {
  const { categorie } = useParams();
  const [categorii, setCategorii] = useState([]);

  const fetchCategoriiProduse = async () => {
    try {
      const res = await categoriiProduseShop();
      setCategorii(res);
    } catch (e) {
      console.log(e);
      throw new Response("", {
        status: 404,
        statusText: "Not found",
      });
    }
  };


  useEffect(() => {
    fetchCategoriiProduse();
  }, [categorie]);

  return (
    <Grid2 container>
      <Grid2 item md={12} sm={12} xs={12}>
        <NavBar />
      </Grid2>
      <Grid2 item md={12} sm={12} xs={12}>
        <Tabs
          value={categorie}
          aria-label="App Tabs"
        >
          {categorii.map((categorie) => (
            <Tab
              key={categorie.id}
              label={categorie.denumire}
              component={NavLink}
              to={`categorie/${categorie.id}`}
              value={categorie.id}
            />
          ))}
        </Tabs>
      </Grid2>
      <Grid2 item md={12} sm={12} xs={12}>
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
