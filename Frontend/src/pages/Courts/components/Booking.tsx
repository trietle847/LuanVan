import { Box, Paper, Typography, Button, Stack, Divider } from "@mui/material";
import dayjs from "dayjs";

interface Props {
  selectedRanges: { start: Date; end: Date }[];
  onBack: () => void;
  onConfirm: () => void;
}

export default function BookingFullScreen({
  selectedRanges,
  onBack,
  onConfirm,
}: Props) {
  console.log("đã hiện component");
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "#f9fafb",
        zIndex: 300,
        p: 9,
        overflow: "auto",
      }}
    >
      <Paper sx={{  mx: "auto", p: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Xác nhận đặt sân
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography fontWeight={600} mb={1}>
          Các khung giờ đã chọn:
        </Typography>

        <Stack spacing={1}>
          {selectedRanges.map((r, i) => (
            <Paper
              key={i}
              sx={{
                p: 1.5,
                bgcolor: "#ecfdf5",
                borderLeft: "4px solid #22c55e",
              }}
            >
              <Typography>📅 {dayjs(r.start).format("DD/MM/YYYY")}</Typography>
              <Typography>
                ⏰ {dayjs(r.start).format("HH:mm")} →{" "}
                {dayjs(r.end).format("HH:mm")}
              </Typography>
            </Paper>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={2}>
          <Button fullWidth variant="outlined" onClick={onBack}>
            Quay lại chọn giờ
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={onConfirm}
          >
            Xác nhận đặt sân
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
