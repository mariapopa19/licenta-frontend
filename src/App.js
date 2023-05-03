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
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/cos-cumparaturi" element={<CosCumparaturi />} />
      <Route
        path="/produs/:produsId"
        loader={loaderDetaliiProdus}
        element={<DetaliiProdus />}
        errorElement={<ErrorPage />}
      />
      <Route path="contul-meu" element={<ContulMeu />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
