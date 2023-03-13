/* eslint-disable react/jsx-pascal-case */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Signup_Test from "./pages/Sigup-Test";
import { StyledEngineProvider } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "test",
    element: <Signup_Test />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <RouterProvider router={router} />
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
