import { FormProvider } from "react-hook-form";
import {
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  SettingsTwoTone as SettingsIcon,
  SaveTwoTone as SaveIcon,
  InventoryTwoTone as StockIcon,
  LocalOfferTwoTone as PriceIcon,
  InfoTwoTone as InfoIcon,
} from "@mui/icons-material";
import { useState } from "react";

import FormTextField from "../../../utils/components/Input/FormTextField";
import FormSelectAutocomplete from "../../../utils/components/Input/FormSelectAutocomplete";
import Gallery from "../../../utils/components/Image/Gallery";
import UploadFile from "../../../utils/components/Image/UploadImage";
import CategoryDialog from "../../../utils/components/Category/CategoryDialog";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "../../../services/category.api";

/* ================= TYPES ================= */
interface ProductFormLayoutProps {
  mode: "create" | "edit";
  formMethods: any;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

export default function ProductFormLayout({
  mode,
  formMethods,
  onSubmit,
  loading,
}: ProductFormLayoutProps) {
  /** id ảnh được chọn để xóa (chỉ dành cho mode edit) */
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
  const [clearSelectionSignal, setClearSelectionSignal] = useState(0);
  const [openCategory, setOpenCategory] = useState(false);

  /** Lấy ảnh cũ từ form (nếu có) */
  const images = formMethods.watch("images") ?? [];

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getAll(),
  });

  /* ===== XỬ LÝ SUBMIT ===== */
  const handleSubmit = (values: any) => {
    const formData = new FormData();

    // Thông tin cơ bản
    formData.append("name", values.name);
    formData.append("description", values.description || "");
    formData.append("price", values.price.toString());
    formData.append("stock", values.stock.toString());

    if (values.categoryId) {
      formData.append("categoryId", values.categoryId.toString());
    }

    // Xử lý ảnh mới
    // if (values.newImage?.length) {
    //   values.newImage.forEach((file: File) => {
    //     formData.append("newImage", file);
    //   });
    // }

    // // Xử lý id ảnh cần xóa
    // deleteImageIds.forEach((id) => {
    //   formData.append("deleteImageIds", id.toString());
    // });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    onSubmit(formData);

    // Reset UI sau khi submit
    setDeleteImageIds([]);
    setClearSelectionSignal((v) => v + 1);
  };

  const description = formMethods.watch("description");
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <Card
          sx={{
            mx: "auto",
            minHeight: "100vh",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {/* Header */}
            <Box
              sx={{ mb: 4, display: "flex", alignItems: "center", gap: 1.5 }}
            >
              <Typography variant="h5" color="primary.main">
                {mode === "create" ? "Thêm Sản Phẩm Mới" : "Cập Nhật Sản Phẩm"}
              </Typography>
            </Box>

            <Stack spacing={4}>
              {/* PHẦN 1: THÔNG TIN CHUNG */}
              <Box>
                <HeaderSection
                  icon={<InfoIcon fontSize="small" />}
                  title="Thông tin cơ bản"
                />

                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                    <Box sx={{ flex: 3 }}>
                      <FormTextField
                        name="name"
                        label="Tên sản phẩm"
                        placeholder="Nhập tên sản phẩm..."
                        fullWidth
                      />
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ flex: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <FormSelectAutocomplete
                          name="categoryId"
                          label="Danh mục"
                          options={categories}
                        />
                      </Box>
                      <Tooltip title="Cài đặt danh mục">
                        <IconButton
                          sx={{
                            mt: 1,
                            borderRadius: 2,
                            width: 50,
                            height: 50,
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: "background.paper",
                            "&:hover": {
                              bgcolor: "primary.lighter",
                              borderColor: "primary.main",
                            },
                          }}
                          onClick={() => setOpenCategory(true)}
                        >
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>

                  {/* Hàng 2: Mô tả */}
                  <Box>
                    <FormTextField
                      name="description"
                      label="Mô tả sản phẩm"
                      multiline
                      rows={3}
                      fullWidth
                      placeholder={
                        mode === "edit" && !description
                          ? "Chưa cập nhật"
                          : "Mô tả về sản phẩm"
                      }
                    />
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* PHẦN 2: GIÁ VÀ KHO */}
              <Box>
                <HeaderSection
                  icon={<PriceIcon fontSize="small" />}
                  title="Giá & Tồn kho"
                />
                <Grid container spacing={2.5}>
                  <Grid item xs={12} md={6}>
                    <FormTextField
                      name="price"
                      label="Giá bán"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₫</InputAdornment>
                        ),
                        sx: { fontWeight: 700, color: "primary.main" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormTextField
                      name="stock"
                      label="Số lượng trong kho"
                      type="number"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <StockIcon sx={{ fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* PHẦN 3: HÌNH ẢNH */}
              {/* <Box>
                <HeaderSection
                  icon={<ImageIcon fontSize="small" />}
                  title="Hình ảnh sản phẩm"
                />
                <Stack spacing={3}>
                  {mode === "edit" && images.length > 0 && (
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "grey.50",
                        borderStyle: "dashed",
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight={700}
                        color="text.secondary"
                        sx={{ mb: 1.5, display: "block" }}
                      >
                        ẢNH HIỆN TẠI (Chọn ảnh để xóa)
                      </Typography>
                      <Gallery
                        items={images}
                        editable
                        onSelectionChange={setDeleteImageIds}
                        clearSelectionSignal={clearSelectionSignal}
                      />
                    </Paper>
                  )}

                  <Box>
                    <UploadFile
                      label="Tải ảnh mới"
                      maxFiles={5}
                      onChange={(files) =>
                        formMethods.setValue("newImage", files)
                      }
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: "block" }}
                    >
                      * Định dạng hỗ trợ: JPG, PNG. Tối đa 5 ảnh. Dung lượng{" "}
                      {"<"} 2MB.
                    </Typography>
                  </Box>
                </Stack>
              </Box> */}

              {/* ACTIONS */}
              <Box sx={{ pt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  startIcon={<SaveIcon />}
                  sx={{
                    py: 1.8,
                    borderRadius: 3,
                    fontSize: "1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 10px 20px rgba(25, 118, 210, 0.2)",
                  }}
                >
                  {loading
                    ? "Đang xử lý..."
                    : mode === "create"
                      ? "Thêm sản phẩm"
                      : "Lưu thay đổi"}
                </Button>
              </Box>
            </Stack>
            <CategoryDialog
              open={openCategory}
              onClose={() => setOpenCategory(false)}
            />
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}

/** Component phụ cho các tiêu đề phân khu */
function HeaderSection({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2.5 }}>
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
      <Typography
        variant="subtitle2"
        fontWeight={700}
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        {title}
      </Typography>
    </Stack>
  );
}
