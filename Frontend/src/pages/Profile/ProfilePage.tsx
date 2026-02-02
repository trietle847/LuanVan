import { Box, Tabs, Tab,Card, Avatar, Stack, Chip, Typography, Button } from "@mui/material";
import { useState } from "react";
import UserProfileTab from "./components/UserProfileTab";
import BookingTab from "./components/BookingTab";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfilePage() {
  const [tab, setTab] = useState(0);
  const {user} = useAuth()

  return (
    <Box sx={{ p: 4, backgroundColor: "#f7f9fb", minHeight: "100vh" }}>
      <Card
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Stack direction="row" spacing={2} alignItems="center">
          {" "}
          <Avatar sx={{ width: 64, height: 64 }} />{" "}
          <Box>
            {" "}
            <Stack direction="row" spacing={1} alignItems="center">
              {" "}
              <Typography variant="h6">
                {" "}
                {user?.lastName + " " + user?.firstName}{" "}
              </Typography>{" "}
              <Chip label="ELITE MEMBER" color="success" size="small" />{" "}
            </Stack>{" "}
            <Typography variant="body2" color="text.secondary">
              {" "}
              Member since January 2023{" "}
            </Typography>{" "}
          </Box>{" "}
        </Stack>{" "}
        <Button variant="contained" color="success">
          {" "}
          Book New Field{" "}
        </Button>{" "}
      </Card>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Profile Information" />
        <Tab label="My Bookings" />
      </Tabs>

      {tab === 0 && <UserProfileTab />}
      {tab === 1 && <BookingTab />}
    </Box>
  );
}
