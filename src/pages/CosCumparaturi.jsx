import { Divider, Grid, Typography } from "@mui/material";
import NavBar from "../layout/NavBar";
import ItemCart from "../components/ItemCart";

const CosCumparaturi = () => {
  return (
    <Grid container >
      <Grid item md={12} sm={12} xs={12}>
        <NavBar />
      </Grid>
      <Grid item md={8} sx={{m:2, mx: 10, my: 4}} container>
        <Typography variant="h5" sx={{width: 1200}}>Cos Cumpărături</Typography>
        <Grid item md={4}>

            <ItemCart />
            <Divider variant="middle" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CosCumparaturi;
