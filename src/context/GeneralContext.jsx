import { createTheme } from "@mui/material";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const GeneralContext = createContext({});

const GeneralProvider = (props) => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ff4081",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
  });

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.clear();
    setToken(null);
    navigate("/");
  };

  return (
    <GeneralContext.Provider value={{ token, setToken, logOut, theme }}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export { GeneralContext, GeneralProvider };
