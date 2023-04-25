/* eslint-disable react/jsx-pascal-case */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/LogIn";
import { StyledEngineProvider } from "@mui/material";
import ErrorPage from "./pages/Error";
import { GeneralProvider } from "./context/GeneralContext";
import SignUp from "./pages/SignUp";
import Loading from "./layout/Loading";
import Admin from "./pages/Admin";
import { ConfirmProvider } from "material-ui-confirm";
import CosCumparaturi from "./pages/CosCumparaturi";

const Home = lazy(() => import("./pages/Home"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        {" "}
        <Home />{" "}
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LogIn />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <SignUp />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path:'cos-cumparaturi',
    element: <CosCumparaturi />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <ConfirmProvider>
      <RouterProvider router={router}>
        <GeneralProvider />
      </RouterProvider>
    </ConfirmProvider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
