import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import {
  Menu as MenuIcon,
  Dashboard,
  Event,
  ShoppingCart,
  Assessment,
  SportsSoccer,
} from "@mui/icons-material";
import { useState, useMemo } from "react";

const menu = [
  { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
  { label: "Quản lý sân", path: "/dashboard/courts", icon: <SportsSoccer /> },
  { label: "Lịch đặt", path: "/dashboard/bookings", icon: <Event /> },
  { label: "Đơn hàng", path: "/dashboard/orders", icon: <ShoppingCart /> },
  { label: "Báo cáo", path: "/dashboard/reports", icon: <Assessment /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const drawerWidth = open ? 240 : 72;

  const drawerSx = useMemo(
    () => ({
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowX: "hidden",
        bgcolor: "#ffffff",
        color: "#0f172a",
        borderRight: "1px solid #e5e7eb",
      },
    }),
    [drawerWidth],
  );

  return (
    <Drawer variant="permanent" sx={drawerSx}>
      {/* ===== HEADER ===== */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: 2,
        }}
      >
        {open && (
          <Typography fontSize={20} fontWeight={700}>
            Admin
          </Typography>
        )}
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* ===== MENU ===== */}
      <List sx={{ mt: 1 }}>
        {menu.map((item) => {
          const isActive =
            item.path === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(item.path);


          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                justifyContent: open ? "flex-start" : "center",

                // ===== ACTIVE STYLE =====
                bgcolor: isActive ? "#e0e7ff" : "transparent",
                color: isActive ? "#1d4ed8" : "#0f172a",

                "&:hover": {
                  bgcolor: isActive ? "#c7d2fe" : "#f1f5f9",
                },

                transition: "all 0.2s ease",
              }}
            >
              <Tooltip title={open ? "" : item.label} placement="right">
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? "#1d4ed8" : "inherit",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
              </Tooltip>

              {open && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
