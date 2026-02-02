import {
  Grid,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
  Box,
  Slide,
} from "@mui/material";
import dayjs from "dayjs";
import CourtWeeklySchedule from "../../components/Schedule";

interface Props {
  selectedRanges: { start: Date; end: Date }[];
  setSelectedRanges: React.Dispatch<
    React.SetStateAction<{ start: Date; end: Date }[]>
  >;
  onSubmit: () => void;
}

export default function CourtBookingTab({
  selectedRanges,
  setSelectedRanges,
  onSubmit,
}: Props) {
  return (
    <>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight={600} mb={2}>
              Chọn khung giờ
            </Typography>

            <CourtWeeklySchedule onSelectRanges={setSelectedRanges} />
          </Paper>
        </Grid>
      </Grid>

      {/* FLOATING BOOKING BAR */}
      <Slide
        direction="up"
        in={selectedRanges.length > 0}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            bgcolor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
            boxShadow: 6,
            px: 3,
            py: 2,
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            {/* INFO */}
            <Grid item xs={12} md={8}>
              <Typography fontWeight={600}>
                Đã chọn {selectedRanges.length} khung giờ
              </Typography>

              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                {selectedRanges.slice(0, 3).map((r, i) => (
                  <Chip
                    key={i}
                    label={`${dayjs(r.start).format(
                      "DD/MM HH:mm",
                    )} – ${dayjs(r.end).format("HH:mm")}`}
                    color="success"
                    size="small"
                  />
                ))}

                {selectedRanges.length > 3 && (
                  <Chip
                    label={`+${selectedRanges.length - 3} nữa`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Stack>
            </Grid>

            {/* ACTION */}
            <Grid item xs={12} md={4} textAlign="right">
              <Button
                variant="contained"
                size="large"
                sx={{ fontWeight: 700, px: 4 }}
                onClick={onSubmit}
              >
                Đặt sân
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </>
  );
}
