import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";


export default function Item({ numeProdus, pret, poza }) {
  return (
    <Card sx={{ margin: "auto", maxWidth: 300, flexGrow: 1 }}>
      <CardMedia
        sx={{ p: 2 }}
        component="img"
        image={poza}
        alt="Produs"
      />
      <CardContent>
        <Typography align="center">{numeProdus}</Typography>
        <Typography align="center">{`${pret} lei`}</Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'center'}}>
        <Button>
          Adaugă în coș
        </Button>
      </CardActions>
    </Card>
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
