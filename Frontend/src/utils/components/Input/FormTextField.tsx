import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export default function FormTextField({ name, label, ...props }: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          value={field.value ?? ""}
          label={label}
          InputLabelProps={{ shrink: true }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          {...props}
        />
      )}
    />
  );
}
