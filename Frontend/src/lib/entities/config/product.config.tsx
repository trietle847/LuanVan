import type { EntityConfig } from "./types";
import type { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import productApi from "../../../services/product.api";
import FormatNumber from "../../../helpper/FormatNumber";
import ProductFormLayout from "../../../pages/Dashboard/Product/ProductFormLayout"
// const formatPrice = (price?: number) =>
//   price?.toLocaleString("vi-VN", {
//     style: "currency",
//     currency: "VND",
//   });

const stockColor = (stock: number) => {
  if (stock === 0) return "error";
  if (stock <= 10) return "warning";
  return "success";
};

export const productConfig: EntityConfig = {
  idKey: "id",
  name: "products",
  label: "Sản phẩm",
  searchKey: "keyword",

  permission: {
    create: true,
    update: true,
    delete: true,
  },

  api: productApi,

  renderForm: (props) => <ProductFormLayout {...props} />,

  getColumns: (actions): GridColDef[] => [
    // ===== TÊN SẢN PHẨM =====
    {
      field: "name",
      headerName: "Sản phẩm",
      flex: 1,
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography fontWeight={600} noWrap>
            {params.value}
          </Typography>
        </Box>
      ),
    },

    // ===== LOẠI =====
    {
      field: "nameCategory",
      headerName: "Danh mục",
      width: 160,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          variant="outlined"
          sx={{
            fontWeight: 500,
            borderRadius: 1.5,
          }}
        />
      ),
    },

    // ===== GIÁ =====
    {
      field: "price",
      headerName: "Giá",
      width: 160,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography fontWeight={600} color="primary">
            {FormatNumber(params.value)} đ
          </Typography>
        </Box>
      ),
    },

    // ===== TỒN KHO =====
    {
      field: "stock",
      headerName: "Kho",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={stockColor(params.value)}
          sx={{
            fontWeight: 600,
            minWidth: 48,
          }}
        />
      ),
    },

    // ===== HÀNH ĐỘNG =====
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
