import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = ({ cartCount = 0, userRole = "customer" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

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
          { label: "Dashboard", path: "/seller/dashboard", icon: <DashboardIcon /> }
        ];

      case "delivery":
        return [
          { label: "Dashboard", path: "/delivery/dashboard", icon: <DashboardIcon /> },
          
        ];

      default:
        return [];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ px: 3 }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, cursor: "pointer" }}
            onClick={() => navigate(`/${userRole}/dashboard`)}
          >
            🚚 DeliverX
          </Typography>

          {/* NAV + PROFILE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {getNavItems().map((item) => (
              <Button
                key={item.path}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* PROFILE AVATAR */}
            <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar sx={{ bgcolor: "secondary.main" }}>
                <PersonIcon />
              </Avatar>
            </IconButton>

            {/* PROFILE MENU */}
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
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
                <>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate("/profile/grow");
                    }}
                  >
                    🔥 Grow with DeliverX
                  </MenuItem>
                </>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
