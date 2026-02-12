import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useState } from "react";
import type { TypeCourt } from "../../../utils/types";
import typeCourtApi from "../../../services/typeCourt.api";

const Hero = () => {
  const [typeCourt, setTypeCourt] = useState<TypeCourt[]>([]);
  useState(() => {
    const fetchData = async () => {
      const res = await typeCourtApi.getAll();
      setTypeCourt(res);
    };
    fetchData();
  });

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAH5Fj33_Y4SXINDYBJ4-qIqo5X1U8kbz39HhdN7M2NSbabntc-ex-dGWKn6vfOvgQlcz-kAtF_EtZc2bVWVtFCc9gQ-DTN7b-drL_PKq9xhGiNFlmJ_TXx1vNMOrKQW_CYfQzcCl97gXUGJKOaFF25KzgHQzR2zYrZ3HVbb_qjZ4oCkjj7Qmj5DfRNMX-pvicRhemsDt2XoRqeULU5i3KAgkob7FIAQMZWCDg1XZC6H1jgsIU_mi0I3dCyXchLw_wJjMLpOz-8dN8")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
        color: "#fff",
        mx: 2,
        borderRadius: 4,
      }}
    >
      <Container maxWidth="md">
        {/* TITLE */}
        <Typography
          variant="h2"
          fontWeight={900}
          textAlign="center"
          gutterBottom
          sx={{
            lineHeight: 1.15,
          }}
        >
          Đặt sân thể thao
          <br />
          <Box component="span" sx={{ color: "#19E66B" }}>
            nhanh chóng & dễ dàng
          </Box>
        </Typography>

        {/* SUBTITLE */}
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ mb: 6, opacity: 0.9 }}
        >
          Hôm nay bạn muốn chơi môn thể thao gì.
        </Typography>

        {/* SEARCH BOX */}
        <Paper
          elevation={8}
          sx={{
            p: 1.5,
            borderRadius: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
            backdropFilter: "blur(8px)",
          }}
        >
          {/* SPORT SELECT */}
          <Box sx={{ flex: 1, px: 2, py: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SportsSoccerIcon fontSize="small" color="primary" />
              <Typography
                variant="caption"
                fontWeight={700}
                fontSize={14}
                color="text.secondary"
              >
                MÔN THỂ THAO
              </Typography>
            </Stack>

            <Select
              fullWidth
              variant="standard"
              defaultValue="football"
              disableUnderline
              sx={{
                fontWeight: 600,
                fontSize: 18,
                mt: 0.5,
              }}
            >
              {typeCourt.map((type) => {
                return <MenuItem value={type.id}>{type.name}</MenuItem>;
              })}
            </Select>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              px: 5,
              py: 2,
              fontWeight: 700,
              borderRadius: 2,
              whiteSpace: "nowrap",
              background: "#19E66B",
              "&:hover": {
                background: "#17a951",
              },
            }}
          >
            Tìm sân ngay
          </Button>
        </Paper>

        {/* TAGLINE */}
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 3, opacity: 0.8 }}
        >
          ⚡ Tiện lợi • ⏱ Nhanh chóng
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
