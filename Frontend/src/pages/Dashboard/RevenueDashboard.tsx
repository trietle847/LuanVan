import React, { useEffect, useState } from "react";
import { Box, Typography, AppBar, Toolbar, Grid, Card } from "@mui/material";
import {
  Group,
  Payments,
  EventSeat,
  WorkspacePremium,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

import KPICard from "../../utils/components/KPICard";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";
import statisticApi from "../../services/statistic.api";

dayjs.locale("vi");

export default function AnalyticsDashboard() {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs());

  const [currentInvoice, setCurrentInvoice] = useState<any>(null);
  const [previousInvoice, setPreviousInvoice] = useState<any>(null);
  const [courtStatistic, setCourtStatistic] = useState<any[]>([]);
  const [bookingStatistic, setBookingStatistic] = useState<any[]>([]);
  const [typeCourtStatistic, setTypeCourtStatistic] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentMonth = selectedMonth.month() + 1;
      const currentYear = selectedMonth.year();

      let prevMonth = currentMonth - 1;
      let prevYear = currentYear;

      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear = currentYear - 1;
      }

      const [current, previous, , court, booking, typeCourt] =
        await Promise.all([
          statisticApi.getInvoiceStatisticByMonth(currentMonth, currentYear),
          statisticApi.getInvoiceStatisticByMonth(prevMonth, prevYear),
          statisticApi.getProductStatisticByMonth(currentMonth, currentYear),
          statisticApi.getCourtStatisticByMonth(currentMonth, currentYear),
          statisticApi.getBookingStatisticByDay(currentMonth, currentYear),
          statisticApi.getTypeCourtStatistic(currentMonth, currentYear),
        ]);

      setCurrentInvoice(current);
      setPreviousInvoice(previous);
      setCourtStatistic(court || []);
      setBookingStatistic(booking || []);
      setTypeCourtStatistic(typeCourt || []);
    };

    fetchData();
  }, [selectedMonth]);

  const revenueChange = previousInvoice?.totalRevenue
    ? ((currentInvoice?.totalRevenue - previousInvoice.totalRevenue) /
        previousInvoice.totalRevenue) *
      100
    : 0;

  const COLORS = ["#22c55e", "#6366f1", "#f59e0b", "#ef4444"];

  const totalTypeCourtBooking = typeCourtStatistic.reduce(
    (sum, item) => sum + item.totalBooking,
    0,
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f6f8f7", minHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: 4,
              minHeight: 72,
            }}
          >
            {/* LEFT */}
            <Box>
              <Typography fontSize={18} fontWeight={700}>
                Bảng báo cáo
              </Typography>
              <Typography fontSize={13} sx={{ opacity: 0.85 }}>
                Tổng hợp số liệu theo tháng
              </Typography>
            </Box>

            {/* RIGHT */}
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
              <DatePicker
                views={["year", "month"]}
                value={selectedMonth}
                onChange={(newValue) => setSelectedMonth(newValue!)}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      width: 170,
                      bgcolor: "rgba(255,255,255,0.15)",
                      borderRadius: 2,
                      input: {
                        color: "#fff",
                      },
                      label: {
                        color: "rgba(255,255,255,0.8)",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#fff",
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 4, maxWidth: 1400, mx: "auto" }}>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Thống kê tháng {selectedMonth.month() + 1} / {selectedMonth.year()}
          </Typography>

          {/* ================= KPI ================= */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                label="Tổng doanh thu"
                value={currentInvoice?.totalRevenue}
                change={revenueChange}
                Icon={Payments}
                color="success"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                label="Tỷ lệ lấp đầy sân"
                value="78.5%"
                change={5.2}
                Icon={EventSeat}
                color="primary"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                label="Sân được thuê nhiều nhất"
                value={courtStatistic?.[0]?.courtName}
                quantity={courtStatistic?.[0]?.totalBooking}
                Icon={WorkspacePremium}
                color="warning"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                label="Khách hàng hoạt động"
                value="12,840"
                change={18.3}
                Icon={Group}
                color="secondary"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8} width={"65%"}>
              <Card sx={{ borderRadius: 3, p: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Xu hướng đặt sân
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Số lượt đặt sân theo từng ngày trong tháng
                  </Typography>
                </Box>

                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={bookingStatistic}
                      margin={{ top: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="day">
                        <Label
                          value="Ngày trong tháng"
                          position="insideBottom"
                          offset={-5}
                          style={{ fontSize: 12, fill: "#6b7280" }}
                        />
                      </XAxis>

                      <YAxis allowDecimals={false}>
                        <Label
                          value="Số lượt đặt sân"
                          angle={-90}
                          position="insideLeft"
                          style={{
                            textAnchor: "middle",
                            fontSize: 12,
                            fill: "#6b7280",
                          }}
                        />
                      </YAxis>

                      <Tooltip
                        formatter={(value: number) => [
                          `${value} lượt`,
                          "Số lượt đặt",
                        ]}
                        labelFormatter={(label) => `Ngày ${label}`}
                      />

                      <Bar
                        dataKey="totalBooking"
                        radius={[6, 6, 0, 0]}
                        fill="#3b82f6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4} width={"30%"}>
              <Card sx={{ borderRadius: 3, p: 2, height: "100%" }}>
                <Typography variant="h6" fontWeight={700}>
                  Tỷ lệ đặt sân theo loại
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Phân bổ lượt đặt sân
                </Typography>

                <Box sx={{ height: 220, position: "relative", mb: 4 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeCourtStatistic}
                        dataKey="totalBooking"
                        nameKey="typeCourtName"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                      >
                        {typeCourtStatistic.map((_, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                        <Label
                          value={`${totalTypeCourtBooking}\nTỔNG LƯỢT`}
                          position="center"
                          style={{
                            textAlign: "center",
                            fontSize: "14px",
                            fontWeight: 700,
                            fill: "#111827",
                            whiteSpace: "pre-line",
                          }}
                        />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Grid container spacing={1}>
                  {typeCourtStatistic.map((item, i) => {
                    const percent =
                      totalTypeCourtBooking > 0
                        ? (
                            (item.totalBooking / totalTypeCourtBooking) *
                            100
                          ).toFixed(0)
                        : 0;

                    return (
                      <Grid item xs={6} key={item.typeCourtId}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              bgcolor: COLORS[i % COLORS.length],
                            }}
                          />
                          <Typography variant="caption" fontWeight={500}>
                            {item.typeCourtName} ({percent}%)
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
