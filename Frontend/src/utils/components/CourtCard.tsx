import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { type Image, type Court, type Price } from "../types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import priceConfigApi from "../../services/priceConfig.api";

interface Props {
  court: Court;
}

const CourtCard = ({ court }: Props) => {
  console.log(court);
const [prices, setPrices] = useState<Price[]>([])

const fetchData = async () => {
  const res = await priceConfigApi.getById(court?.typeCourtId);
  console.log(res);
}
useEffect(() => {
  fetchData()
}, [court])
  return (
    <Link to={`/court/${court.id}`}>
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia component="img" height={200} image={court.images[0]?.url} />

        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={700}>{court.name}</Typography>
            <Box display="flex" alignItems="center">
              <StarIcon fontSize="small" color="warning" />
              {/* <Typography fontSize={13} fontWeight={700}>
              {court.rating}
            </Typography> */}
            </Box>
          </Box>

          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ pr: 7 }}>
              <Typography fontSize={11} color="text.secondary">
                Starting from
              </Typography>
              {/* <Typography fontWeight={700}>${court.pricePerHour}/hr</Typography> */}
            </Box>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#13ec6d",
                color: "#000",
                fontWeight: 700,
                borderRadius: 2,
              }}
            >
              Book Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourtCard;
