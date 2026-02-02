import {
  Box,
  Grid,
  Typography,
  Paper,
  Stack,
  Chip,
  Card,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import priceConfigApi from "../../../../services/priceConfig.api";
import { useQuery } from "@tanstack/react-query";

interface Props {
  court: any;
}

const DAY_MAP: Record<number, string> = {
  1: "Thứ 2",
  2: "Thứ 3",
  4: "Thứ 4",
  8: "Thứ 5",
  16: "Thứ 6",
  32: "Thứ 7",
  64: "Chủ nhật",
};

const renderDays = (days: number[]) => {
  return days.map((d) => DAY_MAP[d]).join(", ");
};

export default function CourtInfoTab({ court }: Props) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (court?.images?.length) {
      setActiveImage(court.images[0].url);
    }
  }, [court]);

  const { data: price } = useQuery({
    queryKey: ["price", court?.typeCourtId],
    queryFn: () => priceConfigApi.getById(court!.typeCourtId),
    enabled: !!court?.typeCourtId,
  });

  return (
    <Grid container spacing={2} justifyContent={"space-between"}>
      {/* ================= LEFT =============== */}
      <Grid item xs={12} md={8} width={"65%"}>
        {/* IMAGE PREVIEW */}
        {activeImage && (
          <Card sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="380"
              image={activeImage}
              alt={court.name}
            />
          </Card>
        )}

        {/* IMAGE GALLERY */}
        {court.images?.length > 1 && (
          <Grid container spacing={2} mb={4}>
            {court.images.map((img: any) => (
              <Grid item xs={4} md={2} key={img.id}>
                <Card
                  onClick={() => setActiveImage(img.url)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    width: 150,
                    border:
                      activeImage === img.url
                        ? "2px solid #1976d2"
                        : "2px solid transparent",
                  }}
                >
                  <CardMedia component="img" height="100" image={img.url} />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* INFO */}
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            {court.name}
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <Chip label="Cầu lông" color="primary" />
            <Chip label="Trong nhà" variant="outlined" />
          </Stack>

          <Typography color="text.secondary" lineHeight={1.8}>
            {court.description ||
              "Sân đạt chuẩn thi đấu, sàn chất lượng cao, ánh sáng tốt, phù hợp tập luyện và thi đấu."}
          </Typography>
        </Paper>
      </Grid>

      {/* ================= RIGHT ================= */}
      <Grid item xs={12} md={4} width={"30%"}>
        {/* PRICE */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 3,
            top: 90,
          }}
        >
          <Typography fontWeight={700} mb={1}>
            Giá sân
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {price?.length > 0 ? (
            <Stack spacing={2}>
              {price.map((p: any) => (
                <Box
                  key={p.id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "grey.50",
                  }}
                >
                  {/* DAYS */}
                  <Typography fontSize={13} color="text.secondary">
                    {renderDays(p.days)}
                  </Typography>

                  {/* TIME */}
                  <Typography fontWeight={600}>
                    {p.startTime.slice(0, 5)} – {p.endTime.slice(0, 5)}
                  </Typography>

                  {/* PRICE */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mt={0.5}
                  >
                    <Typography color="text.secondary" fontSize={13}>
                      {p.isPeak ? "Giờ cao điểm" : "Giờ thường"}
                    </Typography>

                    <Typography fontWeight={700} color="primary">
                      {p.price.toLocaleString()} đ / giờ
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">Chưa có cấu hình giá</Typography>
          )}
        </Paper>

        {/* RELATED COURTS */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontWeight={700} mb={2}>
            Sân liên quan
          </Typography>

          <Stack spacing={2}>
            {[1, 2, 3].map((_, i) => (
              <Card
                key={i}
                sx={{
                  display: "flex",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  image={activeImage}
                  sx={{ width: 90 }}
                />
                <Box sx={{ p: 1.5 }}>
                  <Typography fontWeight={600} fontSize={14}>
                    Sân cầu lông {i + 1}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    Trong nhà · 150.000đ/giờ
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
