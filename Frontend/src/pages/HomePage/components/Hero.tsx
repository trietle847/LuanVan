import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Hero = () => {
  return (
    <Box
      sx={{
        py: 10,
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAH5Fj33_Y4SXINDYBJ4-qIqo5X1U8kbz39HhdN7M2NSbabntc-ex-dGWKn6vfOvgQlcz-kAtF_EtZc2bVWVtFCc9gQ-DTN7b-drL_PKq9xhGiNFlmJ_TXx1vNMOrKQW_CYfQzcCl97gXUGJKOaFF25KzgHQzR2zYrZ3HVbb_qjZ4oCkjj7Qmj5DfRNMX-pvicRhemsDt2XoRqeULU5i3KAgkob7FIAQMZWCDg1XZC6H1jgsIU_mi0I3dCyXchLw_wJjMLpOz-8dN8")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 500,
        display: "flex",
        alignItems: "center",
        color: "white",
        m: 2,
        borderRadius: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          fontWeight={900}
          textAlign="center"
          gutterBottom
        >
          Hôm nay bạn muốn <br /> chơi gì nào!
        </Typography>

        <Typography
          variant="h6"
          textAlign="center"
          sx={{ mb: 6, opacity: 0.9 }}
        >
          Book top-rated sports facilities near you instantly.
        </Typography>

        <Paper
          sx={{
            p: 1,
            borderRadius: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          }}
        >
          {/* SPORT */}
          <Box sx={{ flex: 1, p: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SportsSoccerIcon fontSize="small" />
              <Typography variant="caption" fontWeight="bold">
                SPORT
              </Typography>
            </Stack>

            <Select
              fullWidth
              variant="standard"
              defaultValue="Tennis"
              disableUnderline
              sx={{ fontWeight: "bold", mt: 0.5 }}
            >
              <MenuItem value="Tennis">Tennis</MenuItem>
              <MenuItem value="Basketball">Basketball</MenuItem>
              <MenuItem value="Football">Football</MenuItem>
            </Select>
          </Box>

          {/* DATE */}
          <Box
            sx={{
              flex: 1,
              p: 1,
              borderLeft: { md: "1px solid #eee" },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarMonthIcon fontSize="small" />
              <Typography variant="caption" fontWeight="bold">
                NGÀY
              </Typography>
            </Stack>

            <TextField
              fullWidth
              type="date"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { fontWeight: "bold", mt: 0.5 },
              }}
            />
          </Box>

          {/* SEARCH */}
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              px: 4,
              py: 2,
              fontWeight: "bold",
              borderRadius: 2,
              whiteSpace: "nowrap",
            }}
          >
            Search
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Hero;
