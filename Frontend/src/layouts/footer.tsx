import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#fff", py: 6, borderTop: "1px solid #e0e0e0" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Cột 1: Logo và Giới thiệu */}
          <Grid item xs={12} md={4}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              {/* Giả lập Logo màu xanh lá */}
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: "#00e676",
                  borderRadius: "4px",
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#000" }}>
                SportCenter
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6, maxWidth: "280px" }}
            >
              Making sports accessible to everyone. Book your court, track your
              progress, and join the community.
            </Typography>
          </Grid>

          {/* Cột 2: Company */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#"
                underline="none"
                color="text.secondary"
                variant="body2"
              >
                About Us
              </Link>
              <Link
                href="#"
                underline="none"
                color="text.secondary"
                variant="body2"
              >
                Careers
              </Link>
              <Link
                href="#"
                underline="none"
                color="text.secondary"
                variant="body2"
              >
                Blog
              </Link>
            </Stack>
          </Grid>

          {/* Cột 3: Support */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link
                href="#"
                underline="none"
                color="text.secondary"
                variant="body2"
              >
                Help Center
              </Link>
              <Link
                href="#"
                underline="none"
                color="text.secondary"
                variant="body2"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                underline="none"
                color="text.secondary"
                variant="body2"
              >
                Privacy Policy
              </Link>
            </Stack>
          </Grid>

          {/* Cột 4: Social Media */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              {["IG", "X", "FB"].map((social) => (
                <IconButton
                  key={social}
                  sx={{
                    bgcolor: "#f5f5f5",
                    width: 40,
                    height: 40,
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#5f6368",
                    "&:hover": { bgcolor: "#eeeeee" },
                  }}
                >
                  {social}
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
