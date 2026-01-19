import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Grid,
  Paper,
  Stack,
  Checkbox,
  Typography,
  Box,
  Pagination,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import productApi from "../../../services/product.api";
import categoryApi from "../../../services/category.api";
import {
  type Category,
  type ProductDetail,
  type SelectProduct,
} from "../../../utils/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (products: SelectProduct[]) => void;
  defaultSelected: SelectProduct[];
}

export default function ServicePickerDialog({
  open,
  onClose,
  onConfirm,
  defaultSelected,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const [selectedProducts, setSelectedProducts] =
    useState<SelectProduct[]>(defaultSelected);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setSelectedProducts(defaultSelected);
  }, [defaultSelected]);

  useEffect(() => {
    categoryApi.getAll().then(setCategories);
  }, []);

  useEffect(() => {
    productApi
      .getAll({
        categoryId: activeCategory === "all" ? undefined : activeCategory,
        page: page - 1,
        size: 6,
      })
      .then((res) => {
        setProducts(res.content);
        setTotalPages(res.totalPages);
      });
  }, [activeCategory, page]);

  const toggleProduct = (p: ProductDetail, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [
        ...prev,
        { productId: p.id, name: p.name, quantity: 1 },
      ]);
    } else {
      setSelectedProducts((prev) => prev.filter((x) => x.productId !== p.id));
    }
  };

  const onChangeQty = (id: number, qty: number) => {
    setSelectedProducts((prev) =>
      prev.map((x) => (x.productId === id ? { ...x, quantity: qty } : x)),
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={false}
      PaperProps={{
        sx: {
          width: 1000,
          maxWidth: "1000px",
          height: "85vh",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle>Chọn dịch vụ</DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Tabs */}
        <Tabs
          value={activeCategory}
          onChange={(_, v) => {
            setActiveCategory(v);
            setPage(1);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 1 }}
        >
          <Tab label="Tất cả" value="all" />
          {categories.map((c) => (
            <Tab key={c.id} label={c.name} value={c.id} />
          ))}
        </Tabs>

        {/* List sản phẩm - cho scroll */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Stack spacing={1}>
            {products.map((product) => {
              const selected = selectedProducts.find(
                (x) => x.productId === product.id,
              );

              return (
                <Paper
                  key={product.id}
                  sx={{
                    p: 1.5,
                    border: "solid 0.1px #ddd",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Checkbox
                      checked={!!selected}
                      onChange={(e) => toggleProduct(product, e.target.checked)}
                    />
                    <Box>
                      <Typography fontWeight={600}>{product.name}</Typography>
                      <Typography variant="caption" color="success.main">
                        {product.price.toLocaleString()}đ
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={!selected || selected.quantity <= 1}
                      onClick={() =>
                        onChangeQty(product.id, (selected?.quantity || 1) - 1)
                      }
                    >
                      -
                    </Button>

                    <Typography width={24} textAlign="center">
                      {selected?.quantity || 1}
                    </Typography>

                    <Button
                      size="small"
                      variant="outlined"
                      disabled={!selected}
                      onClick={() =>
                        onChangeQty(product.id, (selected?.quantity || 1) + 1)
                      }
                    >
                      +
                    </Button>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Box>

        {/* Pagination luôn ở đáy */}
        <Box display="flex" justifyContent="center" pt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="success"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => onConfirm(selectedProducts)}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
