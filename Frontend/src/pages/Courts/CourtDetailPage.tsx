import { useState } from "react";
import { Box, Grid, Typography, Button, Paper, Stack, Divider, Chip } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

import CourtWeeklySchedule from "./components/Schedule";
import bookingApi from "../../services/booking.api";
import BookingFullScreen from "./components/Booking";

export default function CourtDetailPage() {
  const { id } = useParams();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState<
    { start: Date; end: Date }[]
  >([]);
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const payload = {
      bookingDetails: selectedRanges.map((r) => ({
        date: dayjs(r.start).format("YYYY-MM-DD"),
        start: dayjs(r.start).format("HH:mm"),
        end: dayjs(r.end).format("HH:mm"),
        courtId: Number(id),
      })),
    };

    console.log("Payload gửi lên:", payload);
    // const res = await bookingApi.create(payload);
    // console.log("Result:", res);
    navigate(`/court/${id}/booking`,{
      state:{selectedRanges}
    })
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3, py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" fontWeight={700}>
              Court Detail
            </Typography>

            <CourtWeeklySchedule onSelectRanges={setSelectedRanges} />

            <Paper sx={{ mt: 3, p: 2 }}>
              <Typography fontWeight={600} mb={1}>
                Các khung giờ đã chọn
              </Typography>

              <Divider sx={{ mb: 1 }} />

              {selectedRanges.length === 0 ? (
                <Typography color="text.secondary">
                  Chưa chọn khung giờ nào
                </Typography>
              ) : (
                <Stack spacing={1}>
                  {selectedRanges.map((r, i) => (
                    <Chip
                      key={i}
                      label={`${dayjs(r.start).format("DD/MM HH:mm")} → ${dayjs(
                        r.end,
                      ).format("HH:mm")}`}
                      color="success"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              )}

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
                // onClick={() => setShowBooking(true)}
                onClick={handleSubmit}
                disabled={selectedRanges.length === 0}
              >
                Đặt sân
              </Button>
            </Paper>
          </Grid>
        </Grid>
        {/* {showBooking && (
          <BookingFullScreen
            selectedRanges={selectedRanges}
            onBack={() => setShowBooking(false)}
            onConfirm={handleSubmit}
          />
        )} */}
      </Box>
    </LocalizationProvider>
  );
}
