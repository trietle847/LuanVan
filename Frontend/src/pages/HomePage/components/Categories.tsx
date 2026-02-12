import React from "react";
import { Box, Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import typeCourtApi from "../../../services/typeCourt.api";
import type { TypeCourt } from "../../../utils/types";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import PoolIcon from "@mui/icons-material/Pool";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

const iconMap: Record<string, React.ReactNode> = {
  "Bóng đá": <SportsSoccerIcon />,
  "Bóng chuyền": <SportsVolleyballIcon />,
  "Bóng bàn": <SportsTennisIcon />,
  "Cầu lông": <SportsTennisIcon />,
  "Hồ bơi": <PoolIcon />,
};

const Categories = () => {
  const { data: categories = [] } = useQuery<TypeCourt[]>({
    queryKey: ["categories"],
    queryFn: () => typeCourtApi.getAll(),
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Title */}
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ mb: 4, textAlign: "center" }}
      >
        Khám phá theo môn thể thao
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categories.map((item) => (
          <Grid item xs={6} sm={4} md={2} key={item.id}>
            <Paper
              elevation={0}
              sx={{
                width: 150, // giữ nguyên
                py: 4,
                mx: "auto",
                textAlign: "center",
                borderRadius: "1.5rem",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                transition: "all .3s ease",
                background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
                  borderColor: "primary.main",
                },
              }}
            >
              {/* ICON / IMAGE */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  mx: "auto",
                  mb: 2,
                }}
              >
                {item.imageUrl ? (
                  <Avatar
                    src={item.imageUrl}
                    alt={item.name}
                    sx={{
                      width: 56,
                      height: 56,
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background:
                        "linear-gradient(135deg, rgba(56,189,248,.2), rgba(37,99,235,.2))",
                      color: "primary.main",
                      transition: "transform .3s",
                      "& svg": {
                        fontSize: 28,
                      },
                      ".MuiPaper-root:hover &": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {iconMap[item.name] ?? <SportsBasketballIcon />}
                  </Avatar>
                )}
              </Box>

              {/* NAME */}
              <Typography
                fontWeight={700}
                fontSize={15}
                sx={{ color: "#0f172a" }}
              >
                {item.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;
