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
import Admin from "./pages/Admin";
import CosCumparaturi from "./pages/CosCumparaturi";
import ErrorPage from "./pages/Error";
import DetaliiProdus, { loaderDetaliiProdus } from "./pages/DetaliiProdus";
import { GeneralProvider } from "./context/GeneralContext";
import { loaderProduse } from "./pages/Home";
import ContulMeu from "./pages/ContulMeu";
import DetaliiComanda, {
  loadComanda,
} from "./components/ContulMeuPage/DetaliiComanda";
import DetaliiContulMeu from "./components/ContulMeuPage/DetaliiContulMeu";
import ComenzileMele from "./components/ContulMeuPage/ComenzileMele";
import SchimbaParola from "./components/ContulMeuPage/SchimbaParola";
import Curier, { loaderCurier } from "./pages/Curier";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import DetaliiComandaCheckout from "./pages/DetaliiComanda";
import ParolaUitata from "./pages/ParolaUitata";
import ConfirmationPage from "./pages/ConfirmareEmailTrimis";
import SchimbareParola from "./pages/SchimbareParola";
import Test from "./pages/test";
const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GeneralProvider />}>
      <Route
        path="/"
        loader={loaderProduse}
        element={
          <Suspense fallback={<Loading />}>
            {" "}
            <Home />{" "}
          </Suspense>
        }
        errorElement={<ErrorPage />}
      />
      <Route path="/login" element={<LogIn />} />
      <Route path="/parola-uitata" element={<ParolaUitata />} />
      <Route path="/email-trimis" element={<ConfirmationPage />} />
      <Route path="/resetare-parola/:token" element={<SchimbareParola />} />
      
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cos-cumparaturi" element={<CosCumparaturi />} />
      <Route path="/detalii-comanda" element={<DetaliiComandaCheckout />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route
        path="/produs/:produsId"
        loader={loaderDetaliiProdus}
        element={<DetaliiProdus />}
        errorElement={<ErrorPage />}
      />
      <Route path="contul-meu" element={<ContulMeu />}>
        <Route index path="detalii-utilizator" element={<DetaliiContulMeu />} />
        <Route path="comenzi" element={<ComenzileMele />} />
        <Route
          path="comanda/:comandaId"
          loader={loadComanda}
          element={<DetaliiComanda />}
          errorElement={<ErrorPage />}
        />
        <Route path="schimba-parola" element={<SchimbaParola />} />
      </Route>
      <Route
        path="curier"
        loader={loaderCurier}
        element={<Curier />}
        errorElement={<ErrorPage />}
      />
      <Route path="/test" element={<Test />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
