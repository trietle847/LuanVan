import {
  Stack,
  Button,
  TextField,
  Typography,
  Box,
  alpha,
  useTheme,
  InputAdornment,
} from "@mui/material";
import {
  SaveTwoTone as SaveIcon,
  LabelTwoTone as LabelIcon,
  AutoAwesomeTwoTone as MagicIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

interface CategoryFormProps {
  mode: "create" | "edit";
  initialData?: { id: number; name: string } | null;
  loading?: boolean;
  onSubmit: (values: { name: string }) => void;
  onCancel: () => void;
}

export default function CategoryForm({
  mode,
  initialData,
  loading,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const theme = useTheme();
  const [name, setName] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setName(initialData.name);
    } else {
      setName("");
    }
  }, [mode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3.5}>
        {/* Minh họa trạng thái */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 3,
            px: 2,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.03),
            border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <MagicIcon
            sx={{ fontSize: 40, color: "primary.main", mb: 1, opacity: 0.8 }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 300 }}
          >
            {mode === "create"
              ? "Tạo một danh mục mới để phân loại sản phẩm của bạn dễ dàng hơn."
              : `Bạn đang chỉnh sửa thông tin cho danh mục "${initialData?.name}"`}
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            color="text.secondary"
            sx={{ ml: 1 }}
          >
            TÊN DANH MỤC
          </Typography>
          <TextField
            fullWidth
            placeholder="VD: Phụ kiện thể thao, Đồ uống..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LabelIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "1.05rem",
                bgcolor: "white",
                "&.Mui-focused": {
                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                },
              },
            }}
          />
        </Stack>

        {/* Nút hành động */}
        <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancel}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              color: "text.secondary",
              borderColor: "divider",
            }}
          >
            Hủy bỏ
          </Button>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading || !name.trim()}
            startIcon={<SaveIcon />}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
            }}
          >
            {loading
              ? "Đang lưu..."
              : mode === "create"
                ? "Tạo danh mục"
                : "Lưu thay đổi"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
