import {
  Button,
  ButtonBase,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ItemCart = ({
  index,
  id,
  poza,
  nume,
  pret,
  cantitate,
  handleRemove,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Img sx={{ width: 128, height: 128 }} alt="produs" src={poza} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {nume}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cantitate: {cantitate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <ButtonGroup variant="contained" sx={{ borderRadius: 10 }}>
                <Button
                  onClick={() => handleDecrement(id)}
                  sx={{ borderRadius: 10 }}
                >
                  -
                </Button>
                <Button disabled>{cantitate}</Button>
                <Button
                  onClick={() => handleIncrement(id)}
                  sx={{ borderRadius: 10 }}
                >
                  +
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <ButtonBase
                sx={{ py: 1.5, px: 0.5 }}
                onClick={() => handleRemove(id, index)}
              >
                <Typography variant="body2">Remove</Typography>
              </ButtonBase>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {pret} lei
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemCart;
