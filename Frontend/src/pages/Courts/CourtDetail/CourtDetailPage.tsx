import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  Tabs,
  Tab,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import courtApi from "../../../services/court.api";
import CourtBookingTab from "./tabs/CourtBooking";
import CourtInfoTab from "./tabs/CourtInfor";

export default function CourtDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedRanges, setSelectedRanges] = useState<
    { start: Date; end: Date }[]
  >([]);
  const [tab, setTab] = useState(0);

  const { data: court, isLoading } = useQuery({
    queryKey: ["court", id],
    queryFn: () => courtApi.getById(Number(id)),
  });


  if (isLoading) return <div>Loading...</div>;
  if (!court) return <div>Không tìm thấy sân</div>;

  const handleSubmit = () => {
    navigate(`/court/${id}/booking`, {
      state: { selectedRanges },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 4 }}>
        <Typography variant="h6" fontWeight={700} flex={1}>
          {court?.name}
        </Typography>

        {/* ===== TABS ===== */}
        {/* TABS */}
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Thông tin sân" />
          <Tab label="Đặt lịch" />
        </Tabs>

        {tab === 0 && <CourtInfoTab court={court} />}

        {tab === 1 && (
          <CourtBookingTab
            selectedRanges={selectedRanges}
            setSelectedRanges={setSelectedRanges}
            onSubmit={handleSubmit}
          />
        )}
      </Box>
    </LocalizationProvider>
  );
}
