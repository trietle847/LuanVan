import { Controller, useFormContext } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

export default function CourtStatus() {
  const { control } = useFormContext();

  return (
    <Controller
      name="status"
      control={control}
      defaultValue="active"
      render={({ field }) => (
        <TextField select label="Trạng thái" {...field}>
          <MenuItem value="active">Hoạt động</MenuItem>
          <MenuItem value="maintenance">Bảo trì</MenuItem>
          <MenuItem value="inactive">Ngừng</MenuItem>
        </TextField>
      )}
    />
  );
}
