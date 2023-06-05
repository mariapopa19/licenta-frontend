// import logo from './logo.svg';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
// import Navbar from './layout/NavBar';
import SignUp from "./pages/SignUp";
import { Suspense, lazy } from "react";
import Loading from "./layout/Loading";
import LogIn from "./pages/LogIn";
import Admin, { loaderAdmin } from "./pages/Admin";
import CosCumparaturi, { loaderCosCumparaturi } from "./pages/CosCumparaturi";
import ErrorPage from "./pages/Error";
import DetaliiProdus, { loaderDetaliiProdus } from "./pages/DetaliiProdus";
import { GeneralProvider } from "./context/GeneralContext";
import ContulMeu from "./pages/ContulMeu";
import DetaliiComanda, {
  loadComanda,
} from "./components/ContulMeuPage/DetaliiComanda";
import DetaliiContulMeu, {
  loaderDeteliiContulMeu,
} from "./components/ContulMeuPage/DetaliiContulMeu";
import ComenzileMele, {
  loaderComenzileMele,
} from "./components/ContulMeuPage/ComenzileMele";
import SchimbaParola from "./components/ContulMeuPage/SchimbaParola";
import Curier, { loaderCurier } from "./pages/Curier";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import DetaliiComandaCheckout, {
  loaderDetaliiComanda,
} from "./pages/DetaliiComanda";
import ParolaUitata from "./pages/ParolaUitata";
import ConfirmationPage from "./pages/ConfirmareEmailTrimis";
import SchimbareParola from "./pages/SchimbareParola";
import Test from "./pages/test";
import CurierCoamndaPreluata from "./pages/CurierComandaPreluata";
import ToateProdusele, {
  loaderProduse,
} from "./components/HomePage/ToateProdusele";
import ProduseCategorie, {
  loaderProduseCategorie,
} from "./components/HomePage/ProduseCategorie";
const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GeneralProvider />} errorElement={<ErrorPage />}>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            {" "}
            <Home />{" "}
          </Suspense>
        }
      >
        <Route index loader={loaderProduse} element={<ToateProdusele />} />
        <Route
          path="categorie/:categorie"
          loader={loaderProduseCategorie}
          element={<ProduseCategorie />}
        />
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="/parola-uitata" element={<ParolaUitata />} />
      <Route path="/email-trimis" element={<ConfirmationPage />} />
      <Route path="/resetare-parola/:token" element={<SchimbareParola />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" loader={loaderAdmin} element={<Admin />} />
      <Route
        path="/cos-cumparaturi"
        loader={loaderCosCumparaturi}
        element={<CosCumparaturi />}
      />
      <Route
        path="/detalii-comanda"
        loader={loaderDetaliiComanda}
        element={<DetaliiComandaCheckout />}
      />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route
        path="/produs/:produsId"
        loader={loaderDetaliiProdus}
        element={<DetaliiProdus />}
      />
      <Route path="contul-meu" element={<ContulMeu />}>
        <Route
          index
          path="detalii-utilizator"
          loader={loaderDeteliiContulMeu}
          element={<DetaliiContulMeu />}
        />
        <Route
          path="comenzi"
          loader={loaderComenzileMele}
          element={<ComenzileMele />}
        />
        <Route
          path="comanda/:comandaId"
          loader={loadComanda}
          element={<DetaliiComanda />}
        />
        <Route path="schimba-parola" element={<SchimbaParola />} />
      </Route>
      <Route path="curier" loader={loaderCurier} element={<Curier />} />
      <Route path="/curier/:comandaId" element={<CurierCoamndaPreluata />} />
      <Route path="/test" element={<Test />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
