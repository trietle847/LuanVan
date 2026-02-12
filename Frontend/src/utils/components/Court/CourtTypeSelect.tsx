import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

export default function CourtTypeSelect(data: any) {
  const { control } = useFormContext();

  console.log(data);
  return (
    <Controller
      name="typeCourtId"
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={[]}
          getOptionLabel={(opt: any) => opt.name}
          onChange={(_, v) => field.onChange(v?.id)}
          renderInput={(params) => <TextField {...params} label="Loại sân" />}
        />
      )}
    />
  );
}
