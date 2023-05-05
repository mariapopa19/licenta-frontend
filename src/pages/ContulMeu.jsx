import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AccountCircleOutlined,
  ExitToAppOutlined,
  LockOutlined,
  LocationOnOutlined,
  ShoppingBasketOutlined,
} from "@mui/icons-material";
import NavBar from "../layout/NavBar";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  comenziShop,
  detaliiUtilizator,
  modificaDetaliiUtilizaor,
} from "../api";
import ComenzileMele from "../components/ContulMeuPage/ComenzileMele";
import DetaliiContulMeu from "../components/ContulMeuPage/DetaliiContulMeu";
import { GeneralContext } from "../context/GeneralContext";
import SchimbaParola from "../components/ContulMeuPage/SchimbaParola";

const drawerWidth = 240;

const ContulMeu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Contul Meu");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (menuText) => {
    setSelectedMenuItem(menuText);
    setIsMenuOpen(false);
  };
  const [comenzi, setComenzi] = useState([]);
  const [detaliiUtilizatorRes, setDetaliiUtiizatorRes] = useState({});
  const { logOut } = useContext(GeneralContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const menuItems = [
    {
      text: "Contul Meu",
      icon: <AccountCircleOutlined />,
    },
    {
      text: "Comenzile Mele",
      icon: <ShoppingBasketOutlined />,
    },
    {
      text: "Adresele Mele",
      icon: <LocationOnOutlined />,
    },
    {
      text: "Schimba Parola",
      icon: <LockOutlined />,
    },
    {
      text: "Deconectare",
      icon: <ExitToAppOutlined />,
    },
  ];

  const menuList = (
    <Box sx={{ width: 239 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component="div"
            onClick={() => handleMenuItemClick(item.text)}
            sx={{
              "&:hover": {
                bgcolor: "action.hover",
              },
              ...(selectedMenuItem === item.text && {
                bgcolor: "action.selected",
                "&:hover": {
                  bgcolor: "action.selected",
                },
              }),
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const fetchDetaliiUtilizator = async () => {
    if (token) {
      const res = await detaliiUtilizator(token);
      setDetaliiUtiizatorRes(res);
      console.log(detaliiUtilizatorRes);
    } else {
      navigate("/login");
    }
  };

  const clickSalveazaDetaliiUtilizator = async (nume, email) => {
    if (token) {
      const res = await modificaDetaliiUtilizaor(token, nume, email);
      console.log(res);
      setDetaliiUtiizatorRes(res);
    } else {
      navigate("/login");
    }
  };

  const fetchComenziUtilizator = async () => {
    if (userId) {
      console.log(userId);
      const res = await comenziShop(userId);
      setComenzi(res);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchDetaliiUtilizator();
    fetchComenziUtilizator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <NavBar sx={{ position: "fixed" }} />
      </Grid>
      <Grid item lg={12} sm={12} md={12} xs={12} container>
        <Grid item md>
          <Box sx={{ display: "flex", marginTop: "70px" }}>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="user account menu"
            >
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <Avatar />
              </Button>
              <Drawer
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "content-box",
                    width: drawerWidth,
                    top: "70px",
                  },
                }}
                variant="temporary"
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                ModalProps={{ keepMounted: true }}
              >
                {menuList}
              </Drawer>
              <Drawer
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    top: "70px",
                  },
                }}
                variant="permanent"
                open
              >
                {menuList}
              </Drawer>
            </Box>
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {selectedMenuItem}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {/* Aici se va adauga componenta corespunzatoare selectiei din meniu */}
              {selectedMenuItem === "Comenzile Mele" ? (
                <ComenzileMele comenzi={comenzi} />
              ) : selectedMenuItem === "Contul Meu" ? (
                <DetaliiContulMeu
                  numeUtilizator={detaliiUtilizatorRes.nume}
                  emailUtilizator={detaliiUtilizatorRes.email}
                  onClickSalveaza={clickSalveazaDetaliiUtilizator}
                />
              ) : selectedMenuItem === "Schimba Parola" ? (
                <SchimbaParola />
              ) : selectedMenuItem === "Deconectare" ? (
                logOut()
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContulMeu;
