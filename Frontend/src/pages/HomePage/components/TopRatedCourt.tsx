import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import CourtCard from "../../../utils/components/CourtCard";
import type { Court } from "../../../utils/types";
import courtApi from "../../../services/court.api";
import { useQuery } from "@tanstack/react-query";

const TopRatedCenters = () => {
  // const [courts, setCourts] = useState<Court[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const data = await courtApi.getAll();
  //     setCourts(data);
  //   })();
  // }, []);

    const { data: courts = [] } = useQuery({
      queryKey: ["courts"],
      queryFn: () => courtApi.getAll(),
    });
  return (
    <Container maxWidth="lg" sx={{ py: 6, m: 0 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
        Top Rated Centers
      </Typography>
      <Grid container spacing={3}>
        {courts.map((court: Court) => (
          <Grid item xs={12} md={6} xl={4} key={court.id}>
            <CourtCard court={court} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopRatedCenters;
