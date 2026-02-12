import {
  Box,
  Button,
  Stack,
  Typography,
  Paper,
  alpha,
  Chip,
} from "@mui/material";
import { DataGrid, type GridRowSelectionModel } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { viVN } from "@mui/x-data-grid/locales";
import {
  Add as AddIcon,
  DeleteSweep as DeleteIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";

import SearchBar from "../../utils/components/SearchBar";
import type { EntityConfig } from "../../lib/entities/config/types";

export default function EntityDataGrid({ config }: { config: EntityConfig }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Tăng mặc định lên 10 cho chuyên nghiệp
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>({
      type: "include",
      ids: new Set(),
    });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [config.name, search, page, pageSize],
    queryFn: () =>
      config.api.getAll({
        keyword: search,
        size: pageSize,
        page,
      }),
  });

  const handleDeleteSelected = async () => {
    if (rowSelectionModel.ids.size === 0) return;
    if (
      !window.confirm(
        `Xác nhận xóa vĩnh viễn ${rowSelectionModel.ids.size} bản ghi đã chọn?`,
      )
    )
      return;

    await Promise.all(
      Array.from(rowSelectionModel.ids).map((id) =>
        config.api.delete(Number(id)),
      ),
    );

    setRowSelectionModel({ type: "include", ids: new Set() });
    refetch();
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* ===== HEADER SECTION ===== */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            color="text.primary"
            sx={{ letterSpacing: -0.5 }}
          >
            {config.label ?? config.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Quản lý và cập nhật thông tin hệ thống{" "}
            {config.label?.toLowerCase() ?? config.name}
          </Typography>
        </Box>

        <Button
          component={Link}
          to={`/dashboard/${config.name}/new`}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2.5,
            px: 3,
            py: 1,
            fontWeight: 600,
            boxShadow: "0 8px 16px " + alpha("#1976d2", 0.2),
            textTransform: "none",
          }}
        >
          Thêm mới
        </Button>
      </Stack>

      {/* ===== TOOLBAR SECTION ===== */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", maxWidth: 600 }}
        >
          <Box sx={{ flex: 1 }}>
            <SearchBar
              onSearch={(value) => {
                setSearch(value);
                setPage(0);
              }}
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{
              borderRadius: 2,
              borderColor: "divider",
              color: "text.primary",
            }}
          >
            Lọc
          </Button>
        </Stack>

        {rowSelectionModel.ids.size > 0 && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" fontWeight={600} color="primary">
              Đã chọn {rowSelectionModel.ids.size} mục
            </Typography>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSelected}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Xóa hàng loạt
            </Button>
          </Stack>
        )}
      </Paper>

      {/* ===== DATAGRID SECTION ===== */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          bgcolor: "background.paper",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        <DataGrid
          rows={data?.content || []}
          rowCount={data?.totalElements || 0}
          columns={config.getColumns({
            onEdit: (row) =>
              navigate(`/dashboard/${config.name}/edit/${row[config.idKey]}`),
            onDelete: async (row) => {
              if (!window.confirm("Bạn có chắc chắn muốn xóa dòng này?"))
                return;
              await config.api.delete(row[config.idKey]);
              refetch();
            },
          })}
          getRowId={(row) => row[config.idKey]}
          loading={isLoading}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={setRowSelectionModel}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          pagination
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          autoHeight
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
              color: "text.primary",
              fontWeight: 700,
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.02),
              cursor: "pointer",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid",
              borderColor: "divider",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },
          }}
        />
      </Paper>
    </Box>
  );
}
