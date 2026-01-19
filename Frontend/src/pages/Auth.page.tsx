import { useState } from "react";
import {
  Box,
  Card,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  IconButton,
  Divider,
  Stack,
  Fade,
  Collapse,
} from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import authApi from "../services/auth.api";
import userApi from "../services/user.api";

type AuthMode = "login" | "register";

const primaryColor = "#19e66b";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSumit = async () => {
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const result = await authApi.login({
          username,
          password,
        });
        console.log("Login success:", result);
        localStorage.setItem("token", result.token)

        const me = await userApi.getMe()
        console.log(me);
      }

      // navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ bgcolor: "#f6f8f7" }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          height={180}
          sx={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2izs6Lq-GsBhGaHNcGinPc9pz6fnsT9OhzHikZZghiM-K5pMM1OUkAJhQ5TzVmTGhnRdtYOp7ETjZBZkyuZzeuEsCQ_wjpMPcPLGVJM6X-jDDdNyanAhUyRJI2V87_yQSYl2KpsOFAfi0BaAvPGdNggRV3VfTYTIAxsuFSch0ZF4ngPdfaAUrilFjq_TDNuC9e1SJgj11iFxJF5iI06iIB7rs-NesAyYN_tX0R9wBTV_nTDaZVA4QyDeUKv_k9VQre2iBn3bSg0M')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content */}
        <Box px={3} pb={4} mt={-6}>
          {/* Logo */}
          <Box textAlign="center" mb={2}>
            <Box
              mx="auto"
              width={64}
              height={64}
              bgcolor={primaryColor}
              borderRadius={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={1}
            >
              <StadiumIcon sx={{ fontSize: 36, color: "#000" }} />
            </Box>
            <Typography fontWeight={700} fontSize={22}>
              Quản lý Sân Thể thao
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={mode}
            onChange={(_, v) => setMode(v)}
            variant="fullWidth"
            sx={{
              mb: 3,
              bgcolor: "#ececec",
              borderRadius: 2,
              minHeight: 40,
              "& .MuiTab-root": {
                minHeight: 44,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
              },
              "& .Mui-selected": {
                bgcolor: primaryColor,
                color: "#000 !important",
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
          >
            <Tab value="login" label="Đăng nhập" />
            <Tab value="register" label="Đăng ký" />
          </Tabs>

          {/* Form */}
          <Fade in timeout={300}>
            <Box>
              <Stack spacing={2}>
                {/* Username (Register only) */}
                <Collapse in={mode === "register"} timeout={300}>
                  <TextField
                    fullWidth
                    label={mode === "login" ? "Email / Tên đăng nhập" : "Email"}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // InputProps={{
                    //   startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
                    // }}
                  />
                </Collapse>

                {/* Email */}
                <TextField
                  fullWidth
                  label="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // InputProps={{
                  //   startAdornment: <PersonOutlineIcon sx={{ mr: 1 }} />,
                  // }}
                />

                {/* Password */}
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: <LockOutlinedIcon sx={{ mr: 1 }} />,
                    endAdornment: (
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <VisibilityOffIcon />
                      </IconButton>
                    ),
                  }}
                />

                {/* Forgot password */}
                <Collapse in={mode === "login"} timeout={250}>
                  <Typography
                    fontSize={12}
                    color={primaryColor}
                    textAlign="right"
                    sx={{ cursor: "pointer", mt: 0.5 }}
                  >
                    Quên mật khẩu?
                  </Typography>
                </Collapse>

                {/* Submit */}
                <Button
                  fullWidth
                  size="large"
                  onClick={handleSumit}
                  sx={{
                    bgcolor: primaryColor,
                    color: "#000",
                    fontWeight: 700,
                    borderRadius: 3,
                    py: 1.4,
                    transition: "all 0.25s ease",
                    "&:hover": { bgcolor: "#10b350" },
                  }}
                >
                  {mode === "login" ? "Đăng nhập" : "Đăng ký"}
                </Button>
              </Stack>
            </Box>
          </Fade>

          {/* Divider */}
          <Divider sx={{ my: 3, fontSize: 13 }}>Hoặc tiếp tục với</Divider>

          {/* Social */}
          <Stack direction="row" spacing={2}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<AppleIcon />}>
              Apple
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default AuthPage;
