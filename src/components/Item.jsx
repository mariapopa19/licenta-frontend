import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  components: {
    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default function Item({
  id,
  numeProdus,
  pret,
  poza,
  adaugareInCos,
  vizualizareProdus,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ margin: "auto", maxWidth: 300, flexGrow: 1 }}>
        <CardActionArea onClick={() => vizualizareProdus(id)}>
          <CardMedia sx={{ p: 2 }} component="img" image={poza} alt="Produs" />
          <CardContent>
            <Typography align="center">{numeProdus}</Typography>
            <Typography align="center">{`${pret} lei`}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => adaugareInCos(id)}>Adaugă în coș</Button>
        </CardActions>
      </Card>
    </ThemeProvider>
    // <Paper
    //   sx={{
    //     p: 2,
    //     margin: "auto",
    //     maxWidth: 300,
    //     flexGrow: 1,
    //     backgroundColor: (theme) =>
    //       theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    //   }}
    // >
    //     <Grid2 container spacing={2} direction='column' alignItems="center">
    //         <Grid2>
    //             <Img src='./images/praline-ciocolata.jpg' />
    //         </Grid2>
    //         <Grid2>
    //             <Typography>Praline ciocolata</Typography>
    //         </Grid2>
    //         <Grid2>
    //             <Typography>49.00 lei</Typography>
    //         </Grid2>
    //     </Grid2>
    // </Paper>
  );
}
