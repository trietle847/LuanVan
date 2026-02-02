import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Divider,
  Switch,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import categoryApi from "../../services/category.api";
import typeCourtApi from "../../services/typeCourt.api";
import productApi from "../../services/product.api";
import courtApi from "../../services/court.api";
import type {
  Court,
  Category,
  ProductDetail,
  SelectProduct,
} from "../../utils/types";
import bookingDetailApi from "../../services/bookingDetail.api";

type Order = {
  id: number;
  bookingDetailId: number | null;
  name: string;
  date: string | null;
  start: string | null;
  end: string | null;
  userId: number | null;
  isGuest: boolean;
  guestName: string | null;
  guestPhone: string | null;
  courtId: number | null;
  products: SelectProduct[];
};

export default function DashboardPOS() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      name: "Hóa đơn 1",
      bookingDetailId: null,
      courtId: null,
      products: [],
      date: null,
      start: null,
      end: null,
      userId: null,
      isGuest: true,
      guestName: null,
      guestPhone: null,
    },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [mainTab, setMainTab] = useState<"COURT" | number>("COURT");
  const [activeTypeCourt, setActiveTypeCourt] = useState<"ALL" | number>("ALL");
  const [typeCourt, setTypeCourt] = useState<Court[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [courts, setCourts] = useState<Court[]>([]);
  const [runningTime, setRunningTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [categoryRes, typeCourtRes, productRes, courtRes] =
        await Promise.all([
          categoryApi.getAll(),
          typeCourtApi.getAll(),
          productApi.getAll(),
          courtApi.getAll(),
        ]);
      setCategories(categoryRes);
      setTypeCourt(typeCourtRes);
      setProducts(productRes.content);
      setCourts(courtRes);
    };
    fetchData();
  }, []);

  const currentOrder = orders[activeTab];

  useEffect(() => {
    let timer: any;
    if (currentOrder.start && !currentOrder.end) {
      timer = setInterval(() => {
        const startTime = new Date(
          currentOrder.date + "T" + currentOrder.start,
        ).getTime();
        setRunningTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentOrder.start, currentOrder.end, activeTab]);

  const addProduct = (p: ProductDetail) => {
    const newOrders = [...orders];
    const order = newOrders[activeTab];
    const exist = order.products.find((x) => x.productId === p.id);

    if (exist) {
      exist.quantity += 1;
    } else {
      order.products.push({
        productId: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
      });
    }
    setOrders(newOrders);
  };

  const increaseProduct = (productId: number) => {
    const newOrders = [...orders];
    const order = newOrders[activeTab];
    const p = order.products.find((x) => x.productId === productId);
    if (p) p.quantity++;
    setOrders(newOrders);
  };

  const decreaseProduct = (id: number) => {
    const newOrders = [...orders];
    const order = newOrders[activeTab];
    const p = order.products.find((x) => x.productId === id);
    if (!p) return;

    p.quantity--;
    if (p.quantity <= 0) {
      order.products = order.products.filter((x) => x.productId !== id);
    }
    setOrders(newOrders);
  };

  // Chọn 1 sân duy nhất
  const selectCourt = (c: Court) => {
    const newOrders = [...orders];
    newOrders[activeTab].courtId = c.id;
    setOrders(newOrders);
  };

  const addNewOrder = () => {
    const newOrder: Order = {
      id: Date.now(),
      name: `Hóa đơn ${orders.length + 1}`,
      bookingDetailId: null,
      courtId: null,
      products: [],
      date: null,
      start: null,
      end: null,
      userId: null,
      isGuest: true,
      guestName: null,
      guestPhone: null,
    };
    setOrders([...orders, newOrder]);
    setActiveTab(orders.length);
  };

  const total = currentOrder.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const handleStart = async () => {
    if (!currentOrder.courtId) return;

    if (currentOrder.start) return;

    const now = new Date();
    const newOrders = [...orders];

    newOrders[activeTab].date = now.toISOString().slice(0, 10);
    newOrders[activeTab].start = now.toTimeString().slice(0, 8);
    newOrders[activeTab].end = null;

    setRunningTime(0);
    const res = await bookingDetailApi.create(newOrders[activeTab]);
    // console.log(newOrders[activeTab]);
    console.log(res);
    newOrders[activeTab].bookingDetailId = res.id;
    setOrders(newOrders);
  };

  const formatTime = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleSubmit = async () => {
    const now = new Date();
    const newOrders = [...orders];
    newOrders[activeTab].end = now.toTimeString().slice(0, 8);
    setOrders(newOrders);
    setRunningTime(0);
    console.log("Gửi BookingDetail:", newOrders[activeTab]);
    const res = await bookingDetailApi.update(
      newOrders[activeTab].bookingDetailId!,
      newOrders[activeTab],
    );
    console.log(res);
  };

  const closeTab = (index: number) => {
    let newOrders = orders.filter((_, i) => i !== index);

    if (newOrders.length === 0) {
      const emptyOrder: Order = {
        id: Date.now(),
        name: "Hóa đơn 1",
        bookingDetailId: null,
        courtId: null,
        products: [],
        date: null,
        start: null,
        end: null,
        userId: null,
        isGuest: true,
        guestName: null,
        guestPhone: null,
      };

      setOrders([emptyOrder]);
      setActiveTab(0);
      return;
    }

    let newActive = activeTab;
    if (index === activeTab) {
      newActive = index > 0 ? index - 1 : 0;
    } else if (index < activeTab) {
      newActive = activeTab - 1;
    }

    setOrders(newOrders);
    setActiveTab(newActive);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f4f6f8",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: 3,
          py: 1,
          background: "linear-gradient(135deg,#1e3c72,#2a5298)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" fontWeight={700} flex={1}>
          SportCTU
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              minHeight: 36,
            },
          }}
        >
          {orders.map((o, index) => (
            <Tab
              key={o.id}
              label={
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography>{o.name}</Typography>
                  <IconButton
                    size="small"
                    sx={{ color: "white" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(index);
                    }}
                  >
                    ✕
                  </IconButton>
                </Box>
              }
            />
          ))}
        </Tabs>

        <IconButton onClick={addNewOrder} sx={{ color: "#fff", ml: 1 }}>
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* LEFT */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Paper
            sx={{
              p: 2,
              height: "100%",
              borderRadius: 4,
              boxShadow: 2,
            }}
          >
            <Box display="flex" gap={1} mb={2} flexWrap="wrap">
              <Chip
                label="Sân"
                color={mainTab === "COURT" ? "success" : "default"}
                onClick={() => setMainTab("COURT")}
              />
              {categories.map((c) => (
                <Chip
                  key={c.id}
                  label={c.name}
                  color={mainTab === c.id ? "success" : "default"}
                  onClick={() => setMainTab(c.id)}
                />
              ))}
            </Box>

            <Grid container spacing={2}>
              {mainTab !== "COURT" &&
                products
                  .filter((p) => mainTab === p.categoryId)
                  .map((p) => (
                    <Grid item xs={3} key={p.id}>
                      <Paper
                        onClick={() => addProduct(p)}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "0.2s",
                          boxShadow: 1,
                          "&:hover": {
                            boxShadow: 4,
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        <Typography fontWeight={600}>{p.name}</Typography>
                        <Typography
                          color="success.main"
                          fontWeight={700}
                          mt={0.5}
                        >
                          {p.price.toLocaleString()} đ
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}

              {mainTab === "COURT" &&
                courts.map((c) => {
                  const locked = !!currentOrder.start; // đã bắt đầu thì khóa
                  const selected = currentOrder.courtId === c.id;

                  return (
                    <Grid item xs={3} key={c.id}>
                      <Paper
                        onClick={() => {
                          if (!locked) selectCourt(c);
                        }}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          textAlign: "center",
                          cursor: locked ? "not-allowed" : "pointer",
                          opacity: locked && !selected ? 0.4 : 1,
                          border: selected
                            ? "2px solid #2e7d32"
                            : "1px solid #e0e0e0",
                          bgcolor: selected ? "success.light" : "#fafafa",
                          transition: "0.2s",
                        }}
                      >
                        <Typography fontWeight={600}>{c.name}</Typography>
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </Paper>
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            width: "38%",
            p: 2,
            bgcolor: "#fff",
            borderLeft: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography fontWeight={600}>Khách vãng lai</Typography>
            <Switch
              checked={currentOrder.isGuest}
              onChange={(e) => {
                const newOrder = [...orders];
                newOrder[activeTab] = {
                  ...newOrder[activeTab],
                  isGuest: e.target.checked,
                };
                setOrders(newOrder);
              }}
              color="success"
            />
          </Box>

          {currentOrder.isGuest && (
            <Box display="flex" gap={1} mb={1}>
              <TextField
                fullWidth
                size="small"
                label="Tên khách"
                value={currentOrder.guestName || ""}
                error={!currentOrder.guestName}
                onChange={(e) => {
                  const newOrders = [...orders];
                  newOrders[activeTab].guestName = e.target.value;
                  setOrders(newOrders);
                }}
              />
              <TextField
                fullWidth
                size="small"
                label="SĐT"
                value={currentOrder.guestPhone || ""}
                error={!currentOrder.guestPhone}
                onChange={(e) => {
                  const newOrders = [...orders];
                  newOrders[activeTab].guestPhone = e.target.value;
                  setOrders(newOrders);
                }}
              />
            </Box>
          )}

          <Paper sx={{ p: 2, borderRadius: 3, mb: 2, boxShadow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={700}>
                  {currentOrder.name}
                </Typography>

                {currentOrder.courtId && (
                  <>
                    <Chip
                      sx={{ mt: 1 }}
                      color="primary"
                      label={`Sân: ${
                        courts.find((c) => c.id === currentOrder.courtId)?.name
                      }`}
                    />
                    <Typography mt={1}>Ngày: {currentOrder.date}</Typography>
                    <Typography>Giờ bắt đầu: {currentOrder.start}</Typography>
                  </>
                )}
              </Box>

              {currentOrder.start && (
                <Box
                  sx={{
                    width: 140,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#111",
                    color: "#00e676",
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: 2,
                  }}
                >
                  ⏱ {formatTime(runningTime)}
                </Box>
              )}
            </Box>
          </Paper>

          <Divider />

          <List sx={{ flex: 1, overflow: "auto" }}>
            {currentOrder.products.length ? (
              currentOrder.products.map((p) => (
                <ListItem
                  key={p.productId}
                  secondaryAction={
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => decreaseProduct(p.productId)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => increaseProduct(p.productId)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={p.name}
                    secondary={`${p.price.toLocaleString()} đ × ${p.quantity}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ m: 2, color: "text.secondary" }}>
                Chưa có sản phẩm
              </Typography>
            )}
          </List>

          <Divider />

          <Box mt={2}>
            <Typography variant="h6" fontWeight={700} mb={1}>
              Tổng: {total.toLocaleString()} đ
            </Typography>

            <Box display="flex" gap={1}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="success"
                disabled={!currentOrder.courtId || !!currentOrder.start}
                onClick={handleStart}
              >
                Bắt đầu
              </Button>

              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Thanh toán
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
