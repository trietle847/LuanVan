import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import typeCourtApi from "../../services/typeCourt.api";

export default function CourtTypeFilter() {
  const [types, setTypes] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selected = searchParams.get("typeCourtId") || "";

  useEffect(() => {
    typeCourtApi.getAll().then(setTypes);
  }, []);

  return (
    <TextField
      select
      size="small"
      label="Loại sân"
      value={selected}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
          params.set("typeCourtId", e.target.value);
        } else {
          params.delete("typeCourtId");
        }
        params.set("page", "1");
        setSearchParams(params, { replace: true });
      }}
      sx={{ minWidth: 160 }}
    >
      <MenuItem value="">Tất cả</MenuItem>
      {types.map((t) => (
        <MenuItem key={t.id} value={t.id}>
          {t.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
