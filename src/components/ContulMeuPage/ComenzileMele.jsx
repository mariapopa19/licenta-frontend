import { Stack } from "@mui/material";
import ComandaItem from "./ComandaItem";

const ComenzileMele = ({ token, comenzi }) => {
  return (
    <Stack spacing={5} direction="column" sx={{ px: { lg: 40 } }}>
      {comenzi.map((comanda) => (
        <ComandaItem
          id={comanda.id}
          data={comanda.createdAt}
          valoare={comanda.produse.reduce(
            (acc, curr) => acc + curr.pret * curr.produseComanda.cantitate,
            0
          )}
          status={comanda.status}
        />
      ))}
    </Stack>
  );
};

export default ComenzileMele;
