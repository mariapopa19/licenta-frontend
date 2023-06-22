import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";

;

export default function Item({
  id,
  numeProdus,
  pret,
  poza,
  adaugareInCos,
  vizualizareProdus,
}) {

  const {theme} = useContext(GeneralContext)
  
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
  );
}
