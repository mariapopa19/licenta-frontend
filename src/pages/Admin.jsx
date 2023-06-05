import { Grid, Typography } from "@mui/material";
import AdminTableProduse from "../components/AdminPage/AdminTableProduse";
import AdminTableFirme from "../components/AdminPage/AdminTableFirme";
import AdminTableComenzi from "../components/AdminPage/AdmnTableComenzi";
import AdminTableCategorii from "../components/AdminPage/AdminTableCategorii";
import AdminTableUsers from "../components/AdminPage/AdminTableUsers";
import NavBar from "../layout/NavBar";
import { redirect } from "react-router-dom";
import { roluriUtilizator } from "../api";

export default function Admin() {
  return (
    <Grid container justifyContent="center" alignItems="center" rowSpacing={6}>
      <Grid item md={12} sm={12} xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12} sm={10} md={10} container rowSpacing={3}>
        <Grid item md>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              width: { lg: "1200px", md: "900px", sm: "600px", xs: "0px" },
            }}
          >
            Utilizatori
          </Typography>
        </Grid>
        <Grid item xs sm md>
          <AdminTableUsers />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={10} container rowSpacing={3}>
        <Grid item md>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Produse
          </Typography>
        </Grid>
        <Grid item xs sm md>
          <AdminTableProduse />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={10} container rowSpacing={3}>
        <Grid item md>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Comenzi
          </Typography>
        </Grid>
        <Grid item xs sm md>
          <AdminTableComenzi />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={10} container spacing={3}>
        <Grid item md>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              width: { lg: "1200px", md: "900px", sm: "600px", xs: "0px" },
            }}
          >
            Firme
          </Typography>
        </Grid>
        <Grid item xs sm md>
          <AdminTableFirme />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={10} container spacing={3}>
        <Grid item md>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              width: { lg: "1200px", md: "900px", sm: "600px", xs: "0px" },
            }}
          >
            Categorii
          </Typography>
        </Grid>
        <Grid item xs sm md>
          <AdminTableCategorii />
        </Grid>
      </Grid>
    </Grid>
  );
}

export const loaderAdmin = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }

  if (token) {
    try {
      const res = await roluriUtilizator(token);
      if (res.admin) {
        return res;
      } else {
        throw Error("Utilizatorul nu este admin");
      }
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
