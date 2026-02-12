import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface FormSelectAutocompleteProps<T> {
  name: string;
  label: string;
  options: T[];

  getOptionLabel?: (option: T) => string;
  getOptionValue?: (option: T) => any;

  disabled?: boolean;
}

export default function FormSelectAutocomplete<T>({
  name,
  label,
  options,
  getOptionLabel = (o: any) => o.name,
  getOptionValue = (o: any) => o.id,
  disabled,
}: FormSelectAutocompleteProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected =
          options.find((o) => getOptionValue(o) === field.value) || null;

        return (
          <Autocomplete
            options={options}
            value={selected}
            disabled={disabled}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(a, b) =>
              getOptionValue(a) === getOptionValue(b)
            }
            onChange={(_, v) => field.onChange(v ? getOptionValue(v) : null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );
      }}
    />
  );
}
