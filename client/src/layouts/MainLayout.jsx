import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

const Layout = ({ children, cartCount = 0, userRole = "customer" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);

  const getNavItems = () => {
    switch (userRole) {
      case "customer":
        return [
          { label: "Dashboard", path: "/customer/dashboard", icon: <DashboardIcon /> },
          {
            label: "Cart",
            path: "/customer/cart",
            icon: (
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            ),
          },
          { label: "My Orders", path: "/customer/orders", icon: <LocalShippingIcon /> },
        ];

      case "seller":
        return [
          { label: "Dashboard", path: "/seller/dashboard", icon: <DashboardIcon /> },
          { label: "Products", path: "/seller/products", icon: <StoreIcon /> },
          { label: "Add Product", path: "/seller/add-product", icon: <AddIcon /> },
        ];

      case "delivery":
        return [
          { label: "Dashboard", path: "/delivery/dashboard", icon: <DashboardIcon /> },
          { label: "Active Delivery", path: "/delivery/active", icon: <LocalShippingIcon /> },
        ];

      default:
        return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) setMobileMenuOpen(false);
  };

  const navItems = getNavItems();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ================= NAVBAR ================= */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ px: 2 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: 1200,
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* LOGO */}
            <Typography
              variant="h6"
              fontWeight={700}
              color="primary.main"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/${userRole}/dashboard`)}
            >
              🚚 DeliverX
            </Typography>

            {/* DESKTOP NAV */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    startIcon={item.icon}
                    onClick={() => handleNavClick(item.path)}
                    variant={location.pathname === item.path ? "contained" : "text"}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* PROFILE AVATAR */}
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <PersonIcon />
                  </Avatar>
                </IconButton>

                {/* PROFILE MENU */}
                <Menu
                  anchorEl={anchorEl}
                  open={openProfile}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate(`/${userRole}/profile`);
                    }}
                  >
                    👤 Edit Profile
                  </MenuItem>

                  {userRole === "customer" && (
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        navigate("/profile/grow");
                      }}
                    >
                      🔥 Grow with DeliverX
                    </MenuItem>
                  )}

                  <Divider />

                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      handleLogout();
                    }}
                  >
                    🚪 Logout
                  </MenuItem>
                </Menu>
              </Box>
            )}

            {/* MOBILE MENU BUTTON */}
            {isMobile && (
              <IconButton onClick={() => setMobileMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 280 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Typography fontWeight={700}>🚚 DeliverX</Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* ================= FOOTER ================= */}
      <Footer />
    </Box>
  );
};

export default Layout;
