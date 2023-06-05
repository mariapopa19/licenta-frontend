import { Suspense, lazy, useContext, useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import { Box, Grid, Pagination } from "@mui/material";
import { GeneralContext } from "../../context/GeneralContext";
import { useNavigate, useParams } from "react-router-dom";
import { adaugaInCos, produseCategorieShop } from "../../api";

const Item = lazy(() => import("../Item"));

const ProduseCategorie = () => {
  const { categorie } = useParams();

  const [produseCatgorie, setProduseCategorie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const numPages = Math.ceil(produseCatgorie.length / itemsPerPage);

  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  const navigate = useNavigate();
  const { produsAdaugatInCos, setProdusAdaugatInCos } =
    useContext(GeneralContext);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const produsePaginaCurenta = produseCatgorie.slice(startIndex, endIndex);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const fetchProduseCategorie = async () => {
    try {
      const res = await produseCategorieShop(categorie);
      setProduseCategorie(res.produse);
    } catch (e) {
      console.log(e);
      throw new Response("", {
        status: 404,
        statusText: "Not found",
      });
    }
  };

  useEffect(() => {
    fetchProduseCategorie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorie]);

  return (
    <Suspense fallback={<Loading />}>
      <Box sx={{ flexGrow: 1, paddingTop: 5 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction={{ xs: "column", sm: "row", md: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          {produsePaginaCurenta.map((produs, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item
                id={produs.id}
                numeProdus={produs.denumire}
                pret={produs.pret}
                poza={produs.imageURL}
                adaugareInCos={handleAdaugaCos}
                vizualizareProdus={handleDetaliiProdus}
              />
            </Grid>
          ))}
        </Grid>
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

export default ProduseCategorie;


export const loaderProduseCategorie = async ({request, params}) => {
    try {
        const res = await produseCategorieShop(params.categorie);
        return res;
      } catch (e) {
        console.log(e);
        throw new Response("", {
          status: 404,
          statusText: "Not found",
        });
      }
}