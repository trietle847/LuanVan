import { FormProvider } from "react-hook-form";
import {
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  SettingsTwoTone as SettingsIcon,
  InfoOutlined as InfoIcon,
  CollectionsTwoTone as ImageIcon,
  CheckCircleTwoTone as SaveIcon,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import FormTextField from "../../../utils/components/Input/FormTextField";
import FormSelectAutocomplete from "../../../utils/components/Input/FormSelectAutocomplete";
import typeCourtApi from "../../../services/typeCourt.api";
import Gallery from "../../../utils/components/Image/Gallery";
import UploadFile from "../../../utils/components/Image/UploadImage";
import TypeCourtDialog from "../../../utils/components/Court/TypeCourtDialog";

interface CourtFormLayoutProps {
  mode: "create" | "edit";
  formMethods: any;
  onSubmit: (data: FormData) => void;
}

export default function CourtFormLayout({
  mode,
  formMethods,
  onSubmit,
}: CourtFormLayoutProps) {
  const [openTypeCourt, setOpenTypeCourt] = useState(false);
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
  const [clearSelectionSignal, setClearSelectionSignal] = useState(0);

  const { data: typeCourts = [] } = useQuery({
    queryKey: ["typeCourts"],
    queryFn: () => typeCourtApi.getAll(),
  });

  const images = formMethods.watch("images") ?? [];

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);

    if (values.sportCenterId) {
      formData.append("sportCenterId", values.sportCenterId.toString());
    }
    if (values.typeCourtId) {
      formData.append("typeCourtId", values.typeCourtId.toString());
    }

    if (values.newImage?.length) {
      values.newImage.forEach((file: File) => {
        formData.append("newImage", file);
      });
    }

    deleteImageIds.forEach((id) => {
      formData.append("deleteImageIds", id.toString());
    });

    onSubmit(formData);
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
            overflow: "visible",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            {/* Header */}
            <Box
              sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "primary.lighter",
                  color: "primary.main",
                  display: "flex",
                }}
              >
                <InfoIcon />
              </Box>
              <Typography variant="h5" fontWeight={700}>
                {mode === "create" ? "Tạo sân mới" : "Cập nhật thông tin sân"}
              </Typography>
            </Box>

            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Thông tin cơ bản
                </Typography>
                <Stack spacing={2.5}>
                  <FormTextField
                    name="name"
                    label="Tên sân thể thao"
                    placeholder="VD: Sân A1 - Sân bóng đá mini"
                  />
                  <FormTextField
                    name="description"
                    label="Mô tả chi tiết"
                    placeholder={
                      mode === "edit" && !description
                        ? "Chưa cập nhật"
                        : "Mô tả về tình trạng sân, tiện ích đi kèm..."
                    }
                    multiline
                    rows={4}
                  />
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Box flex={1}>
                      <FormSelectAutocomplete
                        name="typeCourtId"
                        label="Loại sân"
                        options={typeCourts}
                      />
                    </Box>
                    <Tooltip title="Quản lý danh mục loại sân">
                      <IconButton
                        color="primary"
                        sx={{
                          mt: 1,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          width: 50,
                          height: 50,
                          bgcolor: "background.paper",
                          transition: "0.2s",
                          "&:hover": {
                            bgcolor: "primary.lighter",
                            borderColor: "primary.main",
                          },
                        }}
                        onClick={() => setOpenTypeCourt(true)}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <ImageIcon color="action" fontSize="small" />
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Hình ảnh sân bãi
                  </Typography>
                </Stack>

                <Stack spacing={3}>
                  {mode === "edit" && images.length > 0 && (
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 3, bgcolor: "grey.50" }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mb: 1, display: "block", fontWeight: 600 }}
                      >
                        ẢNH HIỆN CÓ (Chọn để xóa)
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
                      * Hỗ trợ định dạng JPG, PNG. Tối đa 5 ảnh.
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Action Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<SaveIcon />}
                sx={{
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow: "0 8px 24px rgba(25, 118, 210, 0.25)",
                }}
              >
                {mode === "create" ? "Xác nhận tạo sân" : "Lưu thay đổi"}
              </Button>
            </Stack>

            <TypeCourtDialog
              open={openTypeCourt}
              onClose={() => setOpenTypeCourt(false)}
            />
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
