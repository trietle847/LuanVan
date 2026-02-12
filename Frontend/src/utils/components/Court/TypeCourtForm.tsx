import {
  Stack,
  Button,
  TextField,
  Typography,
  Box,
  Switch,
  IconButton,
  FormControlLabel,
  Paper,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import {
  DeleteOutline as DeleteIcon,
  Add as AddIcon,
  AccessTime as TimeIcon,
  PaymentsOutlined as MoneyIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import priceConfigApi from "../../../services/priceConfig.api";

/* ===== TYPES ===== */
interface PriceRule {
  id?: number;
  startTime: string;
  endTime: string;
  price: number;
  days: number[];
  isPeak: boolean;
}

interface TypeCourtFormProps {
  mode: "create" | "edit";
  initialData?: { id: number; name: string } | null;
  loading?: boolean;
  onSubmit: (values: { name: string; prices: PriceRule[] }) => void;
  onCancel: () => void;
}

/* ===== DAYS CONSTANTS ===== */
const DAYS = [
  { label: "T2", value: 1 },
  { label: "T3", value: 2 },
  { label: "T4", value: 4 },
  { label: "T5", value: 8 },
  { label: "T6", value: 16 },
  { label: "T7", value: 32 },
  { label: "CN", value: 64 },
];

export default function TypeCourtForm({
  mode,
  initialData,
  loading,
  onSubmit,
  onCancel,
}: TypeCourtFormProps) {
  const [name, setName] = useState("");
  const [prices, setPrices] = useState<PriceRule[]>([]);

  /* ===== FETCH PRICE ===== */
  const fetchPrice = async (id: number) => {
    try {
      const res = await priceConfigApi.getById(id);
      setPrices(
        (res || []).map((p: any) => ({
          ...p,
          isPeak: !!p.isPeak,
        })),
      );
    } catch (error) {
      console.error("Failed to fetch prices", error);
    }
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.name);
      fetchPrice(initialData.id);
    } else {
      setName("");
      setPrices([]);
    }
  }, [mode, initialData]);

  /* ===== PRICE HANDLERS ===== */
  const addPrice = () => {
    setPrices((prev) => [
      ...prev,
      {
        startTime: "06:00",
        endTime: "22:00",
        price: 0,
        days: [1, 2, 4, 8, 16, 32, 64], // Mặc định chọn tất cả các ngày
        isPeak: false,
      },
    ]);
  };

  const updatePrice = (index: number, data: Partial<PriceRule>) => {
    setPrices((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...data } : p)),
    );
  };

  const handleDayToggle = (index: number, newDays: number[]) => {
    updatePrice(index, { days: newDays });
  };

  const removePrice = (index: number) => {
    setPrices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({ name, prices });
  };

  return (
    <Stack spacing={3} sx={{ p: 1 }}>
      {/* Header Section */}
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.main"
          gutterBottom
        >
          {mode === "edit" ? "Cập nhật loại sân" : "Tạo loại sân mới"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Vui lòng điền thông tin và thiết lập bảng giá chi tiết cho từng khung
          giờ.
        </Typography>
      </Box>

      <TextField
        fullWidth
        label="Tên loại sân (VD: Sân 5 người, Sân VIP...)"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên loại sân"
        autoFocus
        InputProps={{
          sx: { borderRadius: 2 },
        }}
      />

      <Divider sx={{ my: 1 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={700}>
          Thiết lập bảng giá
        </Typography>
      </Divider>

      {/* Prices List */}
      <Stack spacing={2.5}>
        {prices.length === 0 && (
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "action.hover",
              borderStyle: "dashed",
              borderRadius: 3,
            }}
          >
            <Typography color="text.secondary">
              Chưa có khung giá nào được tạo.
            </Typography>
          </Paper>
        )}

        {prices.map((rule, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              transition: "0.2s",
              "&:hover": {
                borderColor: "primary.light",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: 12, right: 12 }}>
              <Tooltip title="Xóa khung giờ">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => removePrice(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Grid container spacing={2} alignItems="flex-start">
              {/* Time Inputs */}
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TimeIcon color="action" fontSize="small" />
                  <TextField
                    size="small"
                    type="time"
                    label="Từ"
                    value={rule.startTime}
                    onChange={(e) =>
                      updatePrice(index, { startTime: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    size="small"
                    type="time"
                    label="Đến"
                    value={rule.endTime}
                    onChange={(e) =>
                      updatePrice(index, { endTime: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Stack>
              </Grid>

              {/* Price Input */}
              <Grid item xs={12} md={4}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <MoneyIcon color="action" fontSize="small" />
                  <TextField
                    size="small"
                    type="number"
                    label="Giá thuê (VNĐ)"
                    value={rule.price}
                    onChange={(e) =>
                      updatePrice(index, { price: Number(e.target.value) })
                    }
                    fullWidth
                    InputProps={{
                      sx: { fontWeight: 600, color: "success.main" },
                    }}
                  />
                </Stack>
              </Grid>

              {/* Peak Switch */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mt: 0.5,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        checked={rule.isPeak}
                        onChange={(e) =>
                          updatePrice(index, { isPeak: e.target.checked })
                        }
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        Giờ cao điểm
                      </Typography>
                    }
                  />
                </Box>
              </Grid>

              {/* Day Selection */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="text.secondary"
                  >
                    ÁP DỤNG CHO CÁC NGÀY:
                  </Typography>
                  <ToggleButtonGroup
                    value={rule.days}
                    onChange={(_, val) => handleDayToggle(index, val)}
                    size="small"
                    color="primary"
                    sx={{
                      flexWrap: "wrap",
                      gap: 1,
                      "& .MuiToggleButton-root": {
                        borderRadius: "8px !important",
                        border: "1px solid !important",
                        borderColor: "divider",
                      },
                    }}
                  >
                    {DAYS.map((d) => (
                      <ToggleButton
                        key={d.value}
                        value={d.value}
                        sx={{ px: 2, py: 0.5, minWidth: 45 }}
                      >
                        {d.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Button
          variant="dashed"
          fullWidth
          startIcon={<AddIcon />}
          onClick={addPrice}
          sx={{
            py: 1.5,
            borderRadius: 3,
            border: "2px dashed",
            borderColor: "divider",
            textTransform: "none",
            "&:hover": { borderStyle: "dashed", bgcolor: "action.hover" },
          }}
        >
          Thêm khung giờ & giá mới
        </Button>
      </Stack>

      {/* Action Buttons */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ mt: 2 }}
      >
        <Button
          onClick={onCancel}
          variant="text"
          sx={{ color: "text.secondary", px: 4, borderRadius: 2 }}
        >
          Hủy bỏ
        </Button>
        <Button
          variant="contained"
          size="large"
          disabled={loading || !name}
          onClick={handleSubmit}
          sx={{
            px: 6,
            borderRadius: 2,
            boxShadow: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {mode === "edit" ? "Cập nhật thay đổi" : "Tạo loại sân"}
        </Button>
      </Stack>
    </Stack>
  );
}
