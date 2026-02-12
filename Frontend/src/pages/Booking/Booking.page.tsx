import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Stack,
  Card,
  Divider,
} from "@mui/material";
import { EventAvailable, Delete, ArrowForward } from "@mui/icons-material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import bookingDetailApi from "../../services/bookingDetail.api";

import {
  type Category,
  type ProductDetail,
  type SelectProduct,
} from "../../utils/types";

import TimeRangeList from "./components/TimeRangeList";
import BookingSummaryBox from "./components/BookingSummaryBox";
import ServicePickerDialog from "./components/SelectService";

export default function BookingSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedRanges } = location.state as {
    selectedRanges: { start: Date; end: Date }[];
  };
  const [openServicePicker, setOpenServicePicker] = useState(false);
  const [activeRange, setActiveRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectProduct[]>([]);
  const [rangeProducts, setRangeProducts] = useState<
    Record<string, SelectProduct[]>
  >({});

  const getRangeKey = (r: { start: Date; end: Date }) =>
    `${dayjs(r.start).toISOString()}_${dayjs(r.end).toISOString()}`;

  const handleUpdateProduct = () => {
    if (!activeRange) return;
    const key = getRangeKey(activeRange);

    const payload = {
      bookingDetails: {
        date: dayjs(activeRange.start).format("YYYY-MM-DD"),
        start: dayjs(activeRange.start).format("HH:mm"),
        end: dayjs(activeRange.end).format("HH:mm"),
        courtId: Number(id),
        products: rangeProducts[key] || [],
      },
    };

    // console.log(payload);
  };

  const handleRemove = (productId: number) => {
    const newList = selectedProducts.filter((p) => p.productId !== productId);
    setSelectedProducts(newList);
  };

  const onChangeQty = (id: number, quantity: number) => {
    if (!activeRange) return;
    const key = getRangeKey(activeRange);

    setSelectedProducts((prev) => {
      const newList = prev.map((x) =>
        x.productId === id ? { ...x, quantity } : x,
      );
      setRangeProducts((map) => ({ ...map, [key]: newList }));
      return newList;
    });
  };

const handleSubmit = async () => {
const payload = selectedRanges.map((r) => ({
  date: dayjs(r.start).format("YYYY-MM-DD"),
  start: dayjs(r.start).format("HH:mm"),
  end: dayjs(r.end).format("HH:mm"),
  courtId: Number(id),
  products: rangeProducts[getRangeKey(r)] || [],
}));

console.log(payload);

const res = await bookingDetailApi.create(payload);
console.log(res);
};

  return (
    <Box px={3} py={4} display={"flex"} flexDirection={"column"}>
      <Grid container spacing={3} justifyContent="center">
        {/* LEFT */}

        <Box width={"50%"}>
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              {/* Time slots */}
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  <EventAvailable sx={{ mr: 1 }} />
                  Xác nhận khung giờ
                </Typography>

                <TimeRangeList
                  ranges={selectedRanges}
                  activeRange={activeRange}
                  onSelect={(r: any) => {
                    setActiveRange(r);
                    const key = getRangeKey(r);
                    setSelectedProducts(rangeProducts[key] || []);
                  }}
                />
              </Card>

              {/* Services */}
              <Typography fontWeight={600}>Dịch vụ đã chọn</Typography>

              {selectedProducts.length === 0 ? (
                <Typography color="text.secondary">
                  Chưa chọn dịch vụ
                </Typography>
              ) : (
                selectedProducts.map((p) => (
                  <Stack
                    key={p.productId}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography>{p.name}</Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          px: 1,
                          py: 0.5,
                        }}
                      >
                        <Button
                          size="small"
                          variant="text"
                          disabled={p.quantity <= 1}
                          onClick={() =>
                            onChangeQty(p.productId, p.quantity - 1)
                          }
                        >
                          −
                        </Button>

                        <Typography
                          width={24}
                          textAlign="center"
                          fontWeight={600}
                        >
                          {p.quantity}
                        </Typography>

                        <Button
                          size="small"
                          variant="text"
                          onClick={() =>
                            onChangeQty(p.productId, p.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </Stack>
                      <Delete
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: "error.dark",
                            transform: "scale(1.1)",
                          },
                          transition: "0.15s",
                        }}
                        onClick={() => handleRemove(p.productId)}
                      />
                    </Box>
                  </Stack>
                ))
              )}

              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => setOpenServicePicker(true)}
              >
                Thêm dịch vụ
              </Button>

              <ServicePickerDialog
                open={openServicePicker}
                defaultSelected={selectedProducts}
                onClose={() => setOpenServicePicker(false)}
                onConfirm={(list) => {
                  setSelectedProducts(list);
                  if (activeRange) {
                    const key = getRangeKey(activeRange);
                    setRangeProducts((map) => ({ ...map, [key]: list }));
                  }
                  setOpenServicePicker(false);
                }}
              />
            </Stack>
          </Grid>
        </Box>

        {/* RIGHT */}
        <Grid item xs={12} lg={3}>
          <BookingSummaryBox
            activeRange={activeRange}
            selectedProducts={selectedProducts}
            courtId={id}
            onSave={handleUpdateProduct}
            onBack={() => navigate(-1)}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 2, mt: 5 }} />

      <Button
        fullWidth
        size="large"
        variant="contained"
        color="success"
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 3,
          width: "50%",
          alignSelf: "center",
        }}
        endIcon={<ArrowForward />}
        onClick={handleSubmit}
      >
        XÁC NHẬN ĐẶT {selectedRanges.length} SÂN
      </Button>
    </Box>
  );
}
