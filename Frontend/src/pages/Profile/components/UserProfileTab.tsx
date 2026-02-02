import {
  Box,
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import { EventAvailable, Logout } from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import userApi from "../../../services/user.api";
import { useEffect, useState } from "react";
import { type User } from "../../../utils/types";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserProfileTab() {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    newPassword: "",
    ReRenderpassword: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        lastName: user?.lastName || "",
        firstName: user?.firstName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        newPassword: "",
        ReRenderpassword: "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    console.log(formData);
    const res = await userApi.update(user.id, formData);
    console.log(res);
  };

  return (
    <Grid container spacing={3}>
      {/* Left */}
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {/* Personal Details */}
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Thông tin chi tiết
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Họ"
                  disabled={!isEditing}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  disabled={!isEditing}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  disabled={!isEditing}
                  value={formData.email}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  disabled={!isEditing}
                  value={formData.phone}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {user?.address ? (
                  <TextField
                    fullWidth
                    label="Location"
                    disabled={!isEditing}
                    value={formData.address}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                ) : (
                  <TextField
                    fullWidth
                    label="Location"
                    disabled={!isEditing}
                    value="Chưa cập nhật"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              </Grid>
            </Grid>
          </Card>

          {/* Security */}
          {isEditing && (
            <Card sx={{ p: 3, borderRadius: 3 }}>
              <Typography fontWeight="bold" mb={2}>
                Security
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mật khẩu mới"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newPassword: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: <LockOutlinedIcon sx={{ mr: 1 }} />,
                      endAdornment: isEditing && (
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <VisibilityOffIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nhập lại mật khẩu"
                    type={showPassword ? "text" : "password"}
                    value={formData.ReRenderpassword}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ReRenderpassword: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: <LockOutlinedIcon sx={{ mr: 1 }} />,
                      endAdornment: isEditing && (
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <VisibilityOffIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Card>
          )}

          <Stack direction="row" justifyContent="space-between">
            {!isEditing ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleSave();
                      setIsEditing(false);
                    }}
                  >
                    Lưu thay đổi
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      // gọi API update ở đây
                      setIsEditing(false);
                    }}
                  >
                    Hủy
                  </Button>
                </Stack>
              </>
            )}

            <Button color="error" startIcon={<Logout />}>
              Log Out
            </Button>
          </Stack>
        </Stack>
      </Grid>

      {/* Right */}
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          {/* Membership */}
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg,#0f3d2e,#145a32)",
              color: "#fff",
            }}
          >
            <Typography variant="overline">Current Plan</Typography>
            <Typography variant="h6">PRO Membership</Typography>
            <Typography variant="body2" mb={2}>
              Renews on Nov 12, 2024
            </Typography>
            <Typography>✔ Unlimited Court Access</Typography>
            <Typography>✔ Guest Invitations (4/mo)</Typography>
            <Typography>✔ Equipment Rentals Included</Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#fff", color: "#145a32" }}
            >
              Manage Subscription
            </Button>
          </Card>

          {/* Stats */}
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Typography fontWeight="bold" mb={2}>
              Quick Stats
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Hours Played</Typography>
                <Typography fontWeight="bold">142h</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Favorite Sport</Typography>
                <Typography fontWeight="bold">Padel</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography color="text.secondary">Win Rate</Typography>
                <Typography fontWeight="bold">64%</Typography>
              </Box>
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
