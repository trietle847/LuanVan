import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function CourtBasicInfo() {
  const { register } = useFormContext();

  return (
    <>
      <TextField label="Tên sân" {...register("name")} />
      <TextField label="Mô tả" {...register("description")} />
    </>
  );
}
