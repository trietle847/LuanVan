import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useQuery } from "@tanstack/react-query";
import { FilterSidebar } from "./components/FilterCourt";
import CourtCard from "../../utils/components/CourtCard";
import { useEffect, useState } from "react";
import courtApi from "../../services/court.api";
import type { Court } from "../../utils/types";

export const DiscoverCourts = () => {

  const { data: courts = [], isLoading } = useQuery({
    queryKey: ["courts"],
    queryFn: () => courtApi.getAll(),
  });

  console.log(courts);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Box
        maxWidth={1440}
        mx="auto"
        px={1}
        py={4}
        display="flex"
        gap={4}
        alignItems="flex-start"
      >
        {/* Sidebar */}
        <FilterSidebar />

        {/* Main content */}
        <Box flex={1}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Danh sách sân hiện có
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Có {courts.length} sân phù hợp
          </Typography>

          {/* Court Grid */}
          <Grid container spacing={2}>
            {courts.map((court) => (
              <Grid item xs={12} md={6} xl={4} key={court.id}>
                <CourtCard court={court} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
