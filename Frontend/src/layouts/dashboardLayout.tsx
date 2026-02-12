import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
