import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";


const OrderContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1rem",
});
const DetailsButton = styled(Button)({
  borderRadius: "50px",
  padding: "8px 16px",
  borderColor: "#212121",
  color: "#212121",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#212121",
    color: "#FFFFFF",
  },
});

const ComandaItem = ({ id, data, valoare, status }) => {
  return (
    <OrderContainer>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography variant="subtitle1" component="div">
          <Box sx={{ fontWeight: "bold" }}>Comanda {id}</Box>
        </Typography>
        <Typography variant="body1" component="div">
          <Box sx={{ fontStyle: "italic" }}>Data: {data}</Box>
        </Typography>
        <Typography variant="body1" component="div">
          <Box sx={{ fontWeight: "bold" }}>Valoare: {valoare} lei</Box>
        </Typography>
      </Box>
      <Box>
        <DetailsButton variant="outlined">Detalii comanda</DetailsButton>
      </Box>
    </OrderContainer>
  );
};

export default ComandaItem;
