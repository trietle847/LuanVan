import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import CourtCard from "../../../utils/components/CourtCard";
import type { Court } from "../../../utils/types";
import courtApi from "../../../services/court.api";

const TopRatedCenters = () => {
  const { data: courts = [] } = useQuery<Court[]>({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await courtApi.getAll();
      return res.content;
    }
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={800}>
          Trung tâm thể thao nổi bật
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
          Những sân được đánh giá cao và được đặt nhiều nhất
        </Typography>
      </Box>

      {/* List */}
      <Grid container spacing={3}>
        {courts.map((court) => (
          <Grid item xs={12} md={6} xl={4} key={court.id}>
            <CourtCard court={court} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopRatedCenters;
