import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function Loading() {
  return (
    <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item md={12} sx={{ textAlign: 'center', marging: 'auto', width: '50%', padding: '25%' }}>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}
