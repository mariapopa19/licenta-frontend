import { Grid, Typography } from "@mui/material";
import AdminTableProduse from "../components/AdminTableProduse";
import AdminTableFirme from "../components/AdminTableFirme";
import AdminTableComenzi from "../components/AdmnTableComenzi";
import AdminTableCategorii from "../components/AdminTableCategorii";
import NavBar from "../layout/NavBar";

export default function Admin() {
  return (
    <Grid container justifyContent="center" alignItems="center" rowSpacing={6}>
      <Grid item md={12} sm={12} xs={12}>
        <NavBar />
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
       <Grid item xs={12} sm={10} md={10}  container spacing={3}>
        <Grid item md>
          <Typography variant="h5" sx={{ fontWeight: "bold", width: {lg: '1200px', md: '900px', sm: '600px', xs: '0px'} }}>
            Firme
          </Typography>
        </Grid>
        <Grid item xs sm md>
          <AdminTableFirme />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={10}  container spacing={3}>
        <Grid item md>
          <Typography variant="h5" sx={{ fontWeight: "bold", width: {lg: '1200px', md: '900px', sm: '600px', xs: '0px'} }}>
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
