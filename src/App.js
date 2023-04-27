// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Navbar from './layout/NavBar';
import SignUp from "./pages/SignUp";
import { Suspense, lazy } from "react";
import Loading from "./layout/Loading";
import LogIn from "./pages/LogIn";
import Admin from "./pages/Admin";
import CosCumparaturi from "./pages/CosCumparaturi";
import ErrorPage from "./pages/Error";
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
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
    </Routes>
  );
}

export default App;
