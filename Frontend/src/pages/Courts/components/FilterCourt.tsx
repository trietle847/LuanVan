import {
  Box,
  Typography,
  Chip,
  Slider,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import typeCourtApi from "../../../services/typeCourt.api";
import type { TypeCourt } from "../../../utils/types";

export const FilterSidebar = () => {
  const [categories, setCategories] = useState<TypeCourt[]>([]);
  const [selected, setSelected] = useState<TypeCourt[]>([]);
  const [price, setPrice] = useState<number[]>([10000, 200000]);

  useEffect(() => {
    (async () => {
      const data = await typeCourtApi.getAll();
      setCategories(data);
    })();
  }, []);

  const toggleCategory = (item: TypeCourt) => {
    setSelected((prev) =>
      prev.some((c) => c.id === item.id)
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item],
    );
  };

  const resetFilter = () => {
    setSelected([]);
    setPrice([10000, 200000]);
  };

  return (
    <Box
      sx={{
        width: 280,
        p: 2.5,
        borderRadius: 3,
        bgcolor: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 88,
      }}
    >
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600} fontSize={18}>
          Bộ lọc
        </Typography>

        <Button
          size="small"
          onClick={resetFilter}
          sx={{
            textTransform: "none",
            fontSize: 12,
            color: "text.secondary",
          }}
        >
          Đặt lại
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* CATEGORY */}
      <Typography fontSize={13} fontWeight={700} mb={1}>
        Loại sân
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1.2} mb={3}>
        {categories.map((item) => {
          const active = selected.some((c) => c.id === item.id);

          return (
            <Chip
              key={item.id}
              label={item.name}
              onClick={() => toggleCategory(item)}
              sx={{
                px: 1,
                fontWeight: 600,
                fontSize: 13,
                borderRadius: 999,
                bgcolor: active ? "primary.main" : "#f3f4f6",
                color: active ? "#fff" : "#374151",
                transition: "all .25s",
                "&:hover": {
                  bgcolor: active ? "primary.dark" : "#e5e7eb",
                },
              }}
            />
          );
        })}
      </Box>

      {/* PRICE */}
      <Typography fontSize={13} fontWeight={700} mb={0.5}>
        Khoảng giá
      </Typography>

      <Typography fontSize={12} color="text.secondary" mb={1}>
        {price[0].toLocaleString()}đ – {price[1].toLocaleString()}đ
      </Typography>

      <Slider
        value={price}
        onChange={(_, v) => setPrice(v as number[])}
        min={0}
        max={500000}
        step={10000}
        sx={{
          mt: 1,
          color: "primary.main",
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
          },
        }}
      />

      {/* ACTION */}
      <Button
        fullWidth
        size="large"
        sx={{
          mt: 3,
          py: 1.3,
          borderRadius: 2,
          fontWeight: 700,
          bgcolor: "primary.main",
          color: "#fff",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        Áp dụng bộ lọc
      </Button>
    </Box>
  );
};
