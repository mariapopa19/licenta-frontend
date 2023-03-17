import { Paper, styled, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '50%',
  });

export function Item({numeProdus, pret, poza}) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 300,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
        <Grid2 container spacing={2} direction='column' alignItems="center">
            <Grid2>
                <Img src='./images/praline-ciocolata.jpg' />
            </Grid2>
            <Grid2>
                <Typography>Praline ciocolata</Typography>
            </Grid2>
            <Grid2>
                <Typography>49.00 lei</Typography>
            </Grid2>
        </Grid2>
    </Paper>
  );
}
