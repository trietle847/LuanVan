import { Paper, Typography, Divider, Stack, Button } from "@mui/material";
import dayjs from "dayjs";
import { Security } from "@mui/icons-material";

export default function BookingSummaryBox({
  activeRange,
  selectedProducts,
  courtId,
  onSave,
  onBack,
}: any) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, position: "sticky", top: 16 }}>
      <Typography variant="h6" fontWeight={700}>
        TÓM TẮT ĐẶT SÂN
      </Typography>

      <Divider sx={{ my: 2 }} />

      {activeRange && (
        <Stack spacing={1}>
          <Typography fontWeight={600}>Sân {courtId}</Typography>
          <Typography>
            {dayjs(activeRange.start).format("DD/MM/YYYY")}
          </Typography>
          <Typography>
            {dayjs(activeRange.start).format("HH:mm")} -{" "}
            {dayjs(activeRange.end).format("HH:mm")}
          </Typography>
        </Stack>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography fontWeight={600}>Dịch vụ đi kèm</Typography>
      <Stack spacing={0.5}>
        {selectedProducts.map((p: any) => (
          <Stack
            key={p.productId}
            direction="row"
            justifyContent="space-between"
          >
            <Typography>{p.name}</Typography>
            <Typography>x{p.quantity}</Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Button
        fullWidth
        variant="contained"
        color="success"
        startIcon={<Security />}
        onClick={onSave}
      >
        LƯU DỊCH VỤ
      </Button>

      <Button
        fullWidth
        variant="outlined"
        color="success"
        sx={{ mt: 1 }}
        onClick={onBack}
      >
        QUAY LẠI
      </Button>
    </Paper>
  );
}
