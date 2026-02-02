import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuth, logout } = useAuth();
    console.log(user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    navigate("/me");
    setAnchorEl(null);
  };

  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Sân", path: "/court" },
    { label: "Lịch", path: "/schedule" },
    { label: "Dịch vụ", path: "/service" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid #ccc",
        boxShadow: 1,
      }}
    >
      <Toolbar sx={{ maxWidth: 1280, width: "100%", mx: "auto" }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mr: 4,
          }}
          onClick={() => navigate("/")}
        >
          <SportsSoccerIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography variant="h6" fontWeight={800}>
            SportCTU
          </Typography>
        </Box>

        {/* Nav */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              color="inherit"
              sx={{
                fontWeight: 600,
                "&.active": {
                  color: "primary.main",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          {(user?.role === "ADMIN" || user?.role === "STAFF") && (
            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={NavLink}
              to={"/dashboard"}
            >
              Quản lý
            </Button>
          )}
        </Box>

        {/* Right actions */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <IconButton>
            <NotificationsIcon />
          </IconButton>

          {/* Auth */}
          {!isAuthenticated ? (
            <Button variant="contained" sx={{ ml: 2 }} onClick={openAuth}>
              Đăng nhập
            </Button>
          ) : (
            <>
              <Button
                sx={{ ml: 2, textTransform: "none", border: 1 }}
                onClick={handleMenuOpen}
                startIcon={
                  <Avatar sx={{ width: 28, height: 28 }}>
                    {user?.username?.[0]?.toUpperCase() || (
                      <AccountCircleIcon />
                    )}
                  </Avatar>
                }
              >
                {user?.lastName + " " + user?.firstName}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Hồ sơ</MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
