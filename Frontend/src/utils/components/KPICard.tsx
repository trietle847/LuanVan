import { Box, Card, CardContent, Typography } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import type { SvgIconProps } from "@mui/material";

interface KPICardProps {
  label: string;
  value: string | number; // Tổng tiền / Tổng giá trị
  quantity?: number; // Số lượng đã bán trong tháng
  change?: number; // % so với tháng trước
  Icon: React.ElementType<SvgIconProps>;
  color?: "primary" | "success" | "warning" | "secondary";
}

export default function KPICard({
  label,
  value,
  quantity,
  change,
  Icon,
  color = "primary",
}: KPICardProps) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent>
        {/* Icon + % change */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box
            sx={{
              p: 1,
              bgcolor: `${color}.light`,
              borderRadius: 2,
              opacity: 0.8,
            }}
          >
            <Icon color={color} />
          </Box>

          {change !== undefined && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: change >= 0 ? "#f0fdf4" : "#fef2f2",
              }}
            >
              {change >= 0 ? (
                <ArrowUpward fontSize="small" color="success" />
              ) : (
                <ArrowDownward fontSize="small" color="error" />
              )}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "bold",
                  color: change >= 0 ? "success.main" : "error.main",
                }}
              >
                {Math.abs(change)}%
              </Typography>
            </Box>
          )}
        </Box>

        {/* Label */}
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>

        {/* Main Value */}
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>

        {/* Quantity */}
        {quantity !== undefined && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: "block" }}
          >
            Số lần đặt: <strong>{quantity}</strong> lần trong tháng
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
