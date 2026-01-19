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
  Dialog,
  DialogContent,
} from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import authApi from "../../services/auth.api";
import { useAuth } from "../../contexts/AuthContext";

type AuthMode = "login" | "register";

const primaryColor = "#19e66b";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AuthModal = ({ open, onClose }: Props) => {
  const { login } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await authApi.login({ username, password });
        console.log(res.token);
        await login(res.token); 
        onClose();
      } else {
        await authApi.create({ username, email, password });
        setMode("login");
      }
    } catch (err) {
      setError("Sai thông tin đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth scroll="body">
      <DialogContent sx={{ p: 0 }}>
        <Card
          sx={{
            // borderRadius: 4,
            boxShadow: "none",
            overflow: "visible",
          }}
        >
          {/* Header image */}
          <Box
            height={150}
            sx={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2izs6Lq-GsBhGaHNcGinPc9pz6fnsT9OhzHikZZghiM-K5pMM1OUkAJhQ5TzVmTGhnRdtYOp7ETjZBZkyuZzeuEsCQ_wjpMPcPLGVJM6X-jDDdNyanAhUyRJI2V87_yQSYl2KpsOFAfi0BaAvPGdNggRV3VfTYTIAxsuFSch0ZF4ngPdfaAUrilFjq_TDNuC9e1SJgj11iFxJF5iI06iIB7rs-NesAyYN_tX0R9wBTV_nTDaZVA4QyDeUKv_k9VQre2iBn3bSg0M')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

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
                "& .MuiTab-root": {
                  minHeight: 44,
                  fontWeight: 600,
                  textTransform: "none",
                },
                "& .Mui-selected": {
                  bgcolor: primaryColor,
                  color: "#000 !important",
                },
                "& .MuiTabs-indicator": { display: "none" },
              }}
            >
              <Tab value="login" label="Đăng nhập" />
              <Tab value="register" label="Đăng ký" />
            </Tabs>

            {/* Form */}
            <Fade in>
              <Stack spacing={2}>
                <Collapse in={mode === "register"}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Collapse>

                <TextField
                  fullWidth
                  label="Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

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

                {error && (
                  <Typography color="error" fontSize={13}>
                    {error}
                  </Typography>
                )}

                <Button
                  fullWidth
                  size="large"
                  disabled={loading}
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: primaryColor,
                    color: "#000",
                    fontWeight: 700,
                    borderRadius: 3,
                    py: 1.4,
                    "&:hover": { bgcolor: "#10b350" },
                  }}
                >
                  {mode === "login" ? "Đăng nhập" : "Đăng ký"}
                </Button>
              </Stack>
            </Fade>

            <Divider sx={{ my: 1 }}>Hoặc</Divider>

            <Stack direction="row" spacing={2}>
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                Google
              </Button>
            </Stack>
          </Box>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
