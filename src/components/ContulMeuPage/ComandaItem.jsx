import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const OrderContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1rem",
});
const DetailsButton = styled(Button)({
  borderRadius: "50px",
  padding: "8px 16px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#c2185b",
    color: "#FFFFFF",
  },
});

const ComandaItem = ({ id, data, valoare, status }) => {
  const navigate = useNavigate()
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
          <Box sx={{ fontStyle: "italic" }}>Status: {status}</Box>
        </Typography>
        <Typography variant="body1" component="div">
          <Box sx={{ fontWeight: "bold" }}>Valoare: {valoare} lei</Box>
        </Typography>
      </Box>
      <Box>
        <DetailsButton variant="outlined" onClick={() => navigate(`/contul-meu/comanda/${id}`)}>Detalii comanda</DetailsButton>
      </Box>
    </OrderContainer>
  );
};

export default ComandaItem;
