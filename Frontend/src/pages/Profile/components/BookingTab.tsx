import { Box, Card, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import bookingDetailApi from "../../../services/bookingDetail.api";
import {type  ProductDetail, type BookingDetail } from "../../../utils/types";

export default function BookingTab() {
  const [booking, setBooking] = useState<BookingDetail[]>([]);
  const [product, setProduct] = useState<ProductDetail>()
  useEffect(() => {
    const fetchBooking = async () => {
      const res = await bookingDetailApi.getAll();
      console.log(res);
      setBooking(res);
    };

    fetchBooking();
  }, []);

  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        Lịch đặt sân của bạn
      </Typography>
      <Stack spacing={2}>
        {booking.map((b) => (
          <Card key={b.id} sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight="bold">Sân số {b.courtId}</Typography>
                <Chip label={`#${b.id}`} color="primary" size="small" />
              </Box>

              <Typography color="text.secondary">
                Ngày: {new Date(b.date).toLocaleDateString("vi-VN")}
              </Typography>

              <Typography>
                Thời gian: {b.start} - {b.end}
              </Typography>

              <Divider />

              <Typography fontWeight="bold">Dịch vụ đi kèm:</Typography>
              {b.products.map((p, i) => (
                <Typography key={i}>
                  • Sản phẩm {p.productId} × {p.quantity}
                </Typography>
              ))}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Card>
  );
}
