import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  IconButton,
  Typography,
  Box,
  Paper,
  Tooltip,
  Divider,
  Fade,
} from "@mui/material";
import {
  Close as CloseIcon,
  EditTwoTone as EditIcon,
  DeleteTwoTone as DeleteIcon,
  AddCircleOutline as AddIcon,
  CategoryTwoTone as TypeIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import typeCourtApi from "../../../services/typeCourt.api";
import TypeCourtForm from "./TypeCourtForm";

type ViewMode = "list" | "create" | "edit";

export default function TypeCourtDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingItem, setEditingItem] = useState<any | null>(null);

  /* ===== GET LIST ===== */
  const { data: typeCourts = [], isLoading } = useQuery({
    queryKey: ["typeCourts"],
    queryFn: () => typeCourtApi.getAll(),
    enabled: open,
  });

  /* ===== CREATE / UPDATE ===== */
  const saveMutation = useMutation({
    mutationFn: (payload: any) =>
      viewMode === "edit" && editingItem
        ? typeCourtApi.update(editingItem.id, payload)
        : typeCourtApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typeCourts"] });
      setViewMode("list");
      setEditingItem(null);
    },
  });

  /* ===== DELETE ===== */
  const deleteMutation = useMutation({
    mutationFn: (id: number) => typeCourtApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typeCourts"] });
    },
  });

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setViewMode("edit");
  };

  const handleDelete = (id: number) => {
    // Note: Bạn có thể thay thế bằng một Dialog confirm custom nếu muốn đẹp hơn nữa
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa loại sân này? Hành động này không thể hoàn tác.",
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setViewMode("list");
        setEditingItem(null);
      }, 200); // Đợi dialog đóng hẳn mới reset mode để tránh giật giao diện
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: { borderRadius: 3, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" },
      }}
    >
      <DialogTitle
        sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: "primary.lighter", // Cần theme hỗ trợ hoặc dùng 'rgba(25, 118, 210, 0.1)'
            color: "primary.main",
          }}
        >
          <TypeIcon />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            {viewMode === "list"
              ? "Quản lý loại sân"
              : viewMode === "edit"
                ? "Chỉnh sửa loại sân"
                : "Thêm loại sân mới"}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 2.5, minHeight: 400, bgcolor: "#f8f9fa" }}>
        {/* ===== LIST VIEW ===== */}
        {viewMode === "list" && (
          <Fade in={viewMode === "list"}>
            <Stack spacing={2.5}>
              <Button
                fullWidth
                startIcon={<AddIcon />}
                variant="contained"
                onClick={() => setViewMode("create")}
                sx={{
                  py: 1.2,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                }}
              >
                Tạo loại sân mới
              </Button>

              <Stack spacing={1.5}>
                {typeCourts.length === 0 && !isLoading ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <Typography color="text.secondary">
                      Chưa có dữ liệu loại sân.
                    </Typography>
                  </Box>
                ) : (
                  typeCourts.map((item: any) => (
                    <Paper
                      key={item.id}
                      elevation={0}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 2,
                        py: 1.5,
                        borderRadius: 2.5,
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "0.2s",
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <Box>
                        <Typography fontWeight={600} color="text.primary">
                          {item.name}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            size="small"
                            sx={{
                              color: "primary.main",
                              bgcolor: "rgba(25, 118, 210, 0.08)",
                              "&:hover": {
                                bgcolor: "rgba(25, 118, 210, 0.15)",
                              },
                            }}
                            onClick={() => handleEdit(item)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Xóa">
                          <IconButton
                            size="small"
                            sx={{
                              color: "error.main",
                              bgcolor: "rgba(211, 47, 47, 0.08)",
                              "&:hover": { bgcolor: "rgba(211, 47, 47, 0.15)" },
                            }}
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Paper>
                  ))
                )}
              </Stack>
            </Stack>
          </Fade>
        )}

        {/* ===== FORM VIEW ===== */}
        {(viewMode === "create" || viewMode === "edit") && (
          <Fade in={viewMode !== "list"}>
            <Box>
              <Button
                startIcon={<BackIcon />}
                size="small"
                onClick={() => setViewMode("list")}
                sx={{ mb: 2, textTransform: "none", color: "text.secondary" }}
              >
                Quay lại danh sách
              </Button>

              <Paper
                sx={{ p: 2, borderRadius: 3, bgcolor: "white" }}
                elevation={0}
              >
                <TypeCourtForm
                  mode={viewMode}
                  initialData={editingItem}
                  loading={saveMutation.isPending}
                  onCancel={() => setViewMode("list")}
                  onSubmit={(values) => saveMutation.mutate(values)}
                />
              </Paper>
            </Box>
          </Fade>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: "white" }}>
        <Button
          onClick={onClose}
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Đóng cửa sổ
        </Button>
      </DialogActions>
    </Dialog>
  );
}
