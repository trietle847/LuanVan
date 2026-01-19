import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import typeCourtApi from "../../../services/typeCourt.api";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import PoolIcon from "@mui/icons-material/Pool";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import type { TypeCourt } from "../../../utils/types";
import { useQuery } from "@tanstack/react-query";

const iconMap: Record<string, React.ReactNode> = {
  "bóng đá": <SportsSoccerIcon />,
  "bóng chuyền": <SportsVolleyballIcon />,
  "bóng bàn": <SportsTennisIcon />,
  "cầu lông": <SportsTennisIcon />,
  "hồ bơi": <PoolIcon />,
};



const Categories = () => {
  // const [categories, setCategories] = useState<TypeCourt[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const data = await typeCourtApi.getAll();
  //     setCategories(data);
  //   })();
  // }, []);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => typeCourtApi.getAll(),
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6, m: 0 }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>
        Explore by Sport
      </Typography>

      <Grid container spacing={2}>
        {categories.map((item) => (
          <Grid item xs={6} sm={4} md={2} key={item.id}>
            <Paper
              elevation={0}
              sx={{
                width: 150,
                py: 4,
                textAlign: "center",
                borderRadius: "1.5rem",
                border: "1px solid #6f8176ff",
                cursor: "pointer",
                transition: "all .3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "primary.main",
                },
              }}
            >
              {/* IMAGE OR ICON */}
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
                      bgcolor: "rgba(25,230,107,.15)",
                      color: "primary.main",
                      width: 56,
                      height: 56,
                    }}
                  >
                    {iconMap[item.name] ?? (
                      <SportsBasketballIcon />
                    )}
                  </Avatar>
                )}
              </Box>

              <Typography fontWeight={700}>
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
