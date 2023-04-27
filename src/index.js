/* eslint-disable react/jsx-pascal-case */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import App from "./App";
import { GeneralProvider } from "./context/GeneralContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <ConfirmProvider>
      <BrowserRouter><GeneralProvider><App /></GeneralProvider></BrowserRouter>
      {/* <RouterProvider router={router}></RouterProvider> */}
    </ConfirmProvider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
