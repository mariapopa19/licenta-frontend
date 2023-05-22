import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const GeneralContext = createContext({});

const GeneralProvider = (props) => {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ff4081",
      },
      secondary: {
        main: "#ff80ab",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    components: {
      MuiCardActionArea: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#880e4f",
      },
      secondary: {
        main: "#c2185b",
      },
      error: {
        main: "#b71c1c",
      },
      success: {
        main: "#1b5e20",
      },
      warning: {
        main: "#f57c00",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    components: {
      MuiCardActionArea: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  });

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [produsAdaugatInCos, setProdusAdaugatInCos] = useState(0);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.clear();
    sessionStorage.clear();
    setToken("");
    setUserId("");
    navigate("/");
  };

  return (
    <GeneralContext.Provider
      value={{
        token,
        setToken,
        logOut,
        lightTheme,
        darkTheme,
        theme,
        setTheme,
        userId,
        setUserId,
        produsAdaugatInCos,
        setProdusAdaugatInCos,
      }}
    >
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        {props.children}
        <Outlet />
      </ThemeProvider>
    </GeneralContext.Provider>
  );
};

export { GeneralContext, GeneralProvider };
