import { Box, Typography, Chip, Slider, Button, Divider } from "@mui/material";
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
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  return (
    <Box
      sx={{
        width: 280,
        p: 3,
        borderRadius: 3,
        bgcolor: "#fff",
        border: "1px solid #eee",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        position: "sticky",
        top: 90,
      }}
    >
      <Typography fontWeight={700} fontSize={18} mb={2}>
        Bộ lọc tìm kiếm
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Category */}
      <Typography fontSize={13} fontWeight={600} mb={1}>
        Loại sân
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
        {categories.map((s) => {
          const active = selected.includes(s);
          return (
            <Chip
              key={s.id}
              label={s.name}
              clickable
              onClick={() => toggleCategory(s)}
              sx={{
                fontWeight: 600,
                bgcolor: active ? "#13ec6d" : "#f4f4f4",
                color: active ? "#000" : "#555",
                "&:hover": {
                  bgcolor: active ? "#10c95c" : "#eaeaea",
                },
              }}
            />
          );
        })}
      </Box>

      {/* Price */}
      <Typography fontSize={13} fontWeight={600} mb={1}>
        Khoảng giá (VNĐ)
      </Typography>

      <Typography fontSize={12} color="text.secondary" mb={1}>
        {price[0].toLocaleString()} đ – {price[1].toLocaleString()} đ
      </Typography>

      <Slider
        value={price}
        onChange={(_, v) => setPrice(v as number[])}
        min={0}
        max={500000}
        step={10000}
        valueLabelDisplay="auto"
        sx={{ color: "#13ec6d" }}
      />

      {/* Apply */}
      <Button
        fullWidth
        size="large"
        sx={{
          mt: 3,
          bgcolor: "#13ec6d",
          color: "#000",
          fontWeight: 700,
          borderRadius: 2,
          py: 1.2,
          "&:hover": {
            bgcolor: "#10c95c",
          },
        }}
      >
        Áp dụng bộ lọc
      </Button>
    </Box>
  );
};
