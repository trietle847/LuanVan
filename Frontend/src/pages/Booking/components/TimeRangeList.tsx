import { Button, Paper, Stack, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

export default function TimeRangeList({ ranges, activeRange, onSelect }: any) {
  return (
    <Stack spacing={1}>
      {ranges.map((r: any, i: number) => (
        <Button
          key={i}
          fullWidth
          sx={{ p: 0, textTransform: "none" }}
          onClick={() => onSelect(r)}
        >
          <Paper
            sx={{
              width: "100%",
              p: 2,
              borderRadius: 3,
              border: "2px solid",
              borderColor: activeRange === r ? "success.main" : "divider",
              bgcolor:
                activeRange === r ? "success.lighter" : "background.paper",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography fontWeight={600}>
                {dayjs(r.start).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs(r.start).format("HH:mm")} –{" "}
                {dayjs(r.end).format("HH:mm")}
              </Typography>
            </Box>
            {activeRange === r && (
              <Typography color="success.main" fontWeight={600}>
                Đang chọn
              </Typography>
            )}
          </Paper>
        </Button>
      ))}
    </Stack>
  );
}
