import Header from "./header";
import Footer from "./footer";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
