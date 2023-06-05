import { Suspense, lazy, useContext, useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import { Box, Pagination } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { adaugaInCos, produseShop } from "../../api";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
const Item = lazy(() => import("../Item"));

const ToateProdusele = () => {
  const [produse, setProduse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const numPages = Math.ceil(produse.length / itemsPerPage);

  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  const navigate = useNavigate();
  const { produsAdaugatInCos, setProdusAdaugatInCos } =
    useContext(GeneralContext);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const produsePaginaCurenta = produse.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleAdaugaCos = async (prodId) => {
    if (token) {
      await adaugaInCos(token, prodId);
      setProdusAdaugatInCos(produsAdaugatInCos + 1);
      navigate("/cos-cumparaturi");
    } else {
      navigate("/login");
    }
  };

  const handleDetaliiProdus = async (produsId) => {
    try {
      navigate(`/produs/${produsId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProduse = async () => {
    try {
      const res = await produseShop();
      setProduse(res.produse);
    } catch (e) {
      console.log(e);
      throw new Response("", {
        status: 404,
        statusText: "Not found",
      });
    }
  };

  useEffect(() => {
    fetchProduse();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction={{ xs: "column", sm: "row", md: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          {produsePaginaCurenta.map((produs, index) => (
            <Grid2 item xs={2} sm={4} md={4} key={index}>
              <Item
                id={produs.id}
                numeProdus={produs.denumire}
                pret={produs.pret}
                poza={produs.imageURL}
                adaugareInCos={handleAdaugaCos}
                vizualizareProdus={handleDetaliiProdus}
              />
            </Grid2>
          ))}
        </Grid2>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <Pagination
            count={numPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ToateProdusele;


export const loaderProduse = async () => {
    try {
      const res = await produseShop();
      return res;
    } catch (e) {
      console.log(e);
      throw new Response("", {
        status: 404,
        statusText: e,
      });
    }
  };