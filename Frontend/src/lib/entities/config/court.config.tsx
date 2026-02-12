import type { EntityConfig } from "./types";
import type { GridColDef } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import courtApi from "../../../services/court.api";
import CourtFormLayout from "../../../pages/Dashboard/Court/CourtFormLayout";

const statusMap: Record<
  string,
  { label: string; color: "success" | "warning" | "error" }
> = {
  active: { label: "Hoạt động", color: "success" },
  maintenance: { label: "Bảo trì", color: "warning" },
  inactive: { label: "Ngừng", color: "error" },
};

export const courtConfig: EntityConfig = {
  idKey: "id",
  name: "courts",
  label: "Sân",
  searchKey: "keyword",

  permission: {
    create: true,
    update: true,
    delete: true,
  },

  api: courtApi,

  renderForm: (props) => <CourtFormLayout {...props} />,

  getColumns: (actions): GridColDef[] => [
    // ===== SÂN =====
    {
      field: "name",
      headerName: "Sân",
      flex: 1,
      minWidth: 280,
      renderCell: (params) => {
        const image = params.row.images?.[0]?.url;

        return (
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={image}
              sx={{
                width: 42,
                height: 42,
                bgcolor: "primary.main",
                fontWeight: 600,
              }}
            >
              {!image && params.value?.charAt(0)}
            </Avatar>

            <Stack spacing={0.3}>
              <Typography fontWeight={600} noWrap>
                {params.value}
              </Typography>
            </Stack>
          </Stack>
        );
      },
    },

    // ===== LOẠI SÂN =====
    {
      field: "typeCourt",
      headerName: "Loại sân",
      width: 160,
      renderCell: (params) => (
        <Chip
          label={params.row.nameTypeCourt || "Chưa phân loại"}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 500,
            borderRadius: 1.5,
          }}
        />
      ),
    },

    // ===== TRẠNG THÁI =====
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const status = statusMap[params.value] || statusMap.active;

        return (
          <Chip
            label={status.label}
            size="small"
            color={status.color}
            sx={{ fontWeight: 600, minWidth: 90 }}
          />
        );
      },
    },

    // ===== ACTIONS =====
    {
      field: "actions",
      headerName: "Hành động",
      width: 110,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Stack direction="row" spacing={1}>
            {actions?.onEdit && (
              <Tooltip title="Chỉnh sửa">
                <IconButton
                  size="small"
                  onClick={() => actions.onEdit?.(params.row)}
                  sx={{
                    bgcolor: "primary.50",
                    "&:hover": {
                      bgcolor: "primary.100",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Edit fontSize="small" color="primary" />
                </IconButton>
              </Tooltip>
            )}

            {actions?.onDelete && (
              <Tooltip title="Xóa">
                <IconButton
                  size="small"
                  onClick={() => actions.onDelete?.(params.row)}
                  sx={{
                    bgcolor: "error.50",
                    "&:hover": {
                      bgcolor: "error.100",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Delete fontSize="small" color="error" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>
      ),
    },
  ],
};
