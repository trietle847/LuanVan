import { TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  return (
    <TextField
      size="small"
      placeholder="Tìm kiếm..."
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
}
