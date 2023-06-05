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
  ShoppingBasketOutlined,
} from "@mui/icons-material";
import NavBar from "../layout/NavBar";
import { useContext,  useState } from "react";
import {  Outlet, useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

const drawerWidth = 240;

const ContulMeu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Contul Meu");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = (menuText) => {
    setSelectedMenuItem(menuText);
    setIsMenuOpen(false);
  };
 
  const { logOut } = useContext(GeneralContext);
  
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Contul Meu",
      icon: <AccountCircleOutlined />,
      path: "detalii-utilizator",
    },
    {
      text: "Comenzile Mele",
      icon: <ShoppingBasketOutlined />,
      path: "comenzi",
    },
    {
      text: "Schimba Parola",
      icon: <LockOutlined />,
      path: "schimba-parola",
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
            onClick={() => {
              if (item.text === "Deconectare") {
                logOut();
              } else {
                handleMenuItemClick(item.text);
                navigate(item.path);
              }
            }}
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
              <Outlet />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContulMeu;
