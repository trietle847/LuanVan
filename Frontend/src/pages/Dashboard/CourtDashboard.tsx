import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { Court, TypeCourt } from "../../utils/types";
import typeCourtApi from "../../services/typeCourt.api";
import courtApi from "../../services/court.api";
import useDebounce from "../../hooks/debounce";

export default function CourtManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [typeCourt, setTypeCourt] = useState<TypeCourt[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [keyword, setKeyword] = useState("");
  const [typeCourtId, setTypeCourtId] = useState<number | undefined>(undefined);

  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    const fetchData = async () => {
      const [typeCourtRes, courtRes] = await Promise.all([
        typeCourtApi.getAll(),
        courtApi.getAll({
          page,
          size: rowsPerPage,
          keyword: debouncedKeyword || undefined,
          typeCourtId: typeCourtId || undefined,
        }),
      ]);
      setTypeCourt(typeCourtRes);
      console.log(courtRes);
      setCourts(courtRes.content);
      setTotal(courtRes.totalElements);
    };
    fetchData();
  }, [page, rowsPerPage, debouncedKeyword, typeCourtId]);

  return (
    <Box p={4} minHeight="100vh">
      {/* ===== HEADER ===== */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "center" }}
        mb={3}
        gap={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Quản lý sân
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Thêm sân mới
        </Button>
      </Stack>

      {/* ===== FILTER ===== */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Nhập tên sân"
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(0);
            }}
          />

          <TextField
            select
            label="Loại sân"
            sx={{ minWidth: 160 }}
            onChange={(e) => {
              const value = e.target.value;
              setTypeCourtId(value === "all" ? undefined : Number(value));
              setPage(0)
            }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {typeCourt.map((tc) => (
              <MenuItem key={tc.id} value={tc.id}>
                {tc.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {/* ===== TABLE ===== */}
      <Paper sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Sân</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Loại sân</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {courts.map((c) => (
                <TableRow
                  key={c.id}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "primary.light" }}>
                        {c.name?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600}>{c.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {c.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        typeCourt.find((tc) => tc.id === c.typeCourtId)?.name ??
                        "Unknown"
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    {/* Nếu có c.status thì bật lại */}
                    {/* 
                    <Chip
                      label={c.status}
                      color={
                        c.status === "Available"
                          ? "success"
                          : c.status === "Maintenance"
                          ? "warning"
                          : "default"
                      }
                      size="small"
                    /> 
                    */}
                    <Chip label="Available" size="small" color="success" />
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Sửa">
                      <IconButton size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton size="small" color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

              {courts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Không tìm thấy sân
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ===== PAGINATION ===== */}
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Paper>
    </Box>
  );
}
