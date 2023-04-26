import { ButtonBase, Grid, Paper, Typography, styled } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ItemCart = ({ id, poza, nume, pret, cantitate, handleRemove }) => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}
    >
      <Grid container spacing={2} >
        <Grid item>
          <Img
            sx={{ width: 128, height: 128 }}
            alt="produs"
            src="https://florariatrias.b-cdn.net/wp-content/uploads/2022/01/20220121_143950.jpg"
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Buchet de flori
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cantitate: 1
              </Typography>
            </Grid>
            <Grid item>
              <ButtonBase sx={{py:1.5, px:.5}} onClick={() => handleRemove(id)}>
                <Typography  variant="body2">
                  Remove
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemCart;
