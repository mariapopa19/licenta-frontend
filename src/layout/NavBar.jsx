import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useNavigate } from "react-router-dom";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { Badge } from "@mui/material";
import { GeneralContext } from "../context/GeneralContext";
import { cosCumparaturi } from "../api";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const pages = ["home", "admin", "curier"];
const settings = ["Contul meu", "Deconectare"];

function NavBar(props) {
  // const { token } = React.useContext(GeneralContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [currentPage, setCurrentPgae] = React.useState('')
  const { produsAdaugatInCos, setProdusAdaugatInCos, logOut, setTheme, theme } =
    React.useContext(GeneralContext);
  let token = localStorage.getItem("token");
  if (token) {
    token = localStorage.getItem("token");
  } else {
    token = sessionStorage.getItem("token");
  }
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    console.log(event.currentTarget);
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (token) {
      setAnchorElUser(event.currentTarget);
    } else {
      return navigate("/login");
    }
  };

  const handleCloseNavMenu = (value) => {
    console.log(value);
    value === "home" ? navigate("/") : navigate(`/${value}`);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const bagdeCosCumparaturi = async () => {
    if (token) {
      const res = await cosCumparaturi(token);
      setProdusAdaugatInCos(
        res.reduce((acc, curr) => acc + curr.produsCosCumparaturi.cantitate, 0)
      );
    } else {
      setProdusAdaugatInCos(0);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  React.useEffect(() => {
    bagdeCosCumparaturi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <ThemeProvider theme={lightTheme}>
    //   <CssBaseline />
    <AppBar position="static" {...props} enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DeliveryDiningIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Gifty
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={(event) => {
                    handleCloseNavMenu(event.target.textContent);
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <DeliveryDiningIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          {/*  */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Gifty
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(event) => {
                  handleCloseNavMenu(event.target.textContent);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                onClick={handleOpenUserMenu}
                size="large"
                color="inherit"
              >
                <PersonRoundedIcon />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      setting === "Contul meu"
                        ? navigate("/contul-meu/detalii-utilizator")
                        : logOut();
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                size="large"
                color="inherit"
                edge="end"
                onClick={() => navigate("/cos-cumparaturi", { replace: true })}
              >
                <Badge badgeContent={produsAdaugatInCos} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                onClick={toggleTheme}
                size="large"
                color="inherit"
                edge="end"
                sx={{ ml: 1 }}
              >
                {theme === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // </ThemeProvider>
  );
}
export default NavBar;
