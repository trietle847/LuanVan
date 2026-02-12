import { useForm } from "react-hook-form";
import type { EntityConfig } from "../../lib/entities/config/types";
import { useEffect } from "react";

interface EntityFormProps {
  config: EntityConfig;
  mode: "create" | "edit";
  data?: any;
  onSubmit: (payload: any) => void;
}

export default function EntityForm({
  config,
  mode,
  data,
  onSubmit,
}: EntityFormProps) {
  const formMethods = useForm({
    defaultValues: {},
  });

  const { reset } = formMethods;

  useEffect(() => {
    if (mode === "edit" && data) {
      reset(data)
    }
  },[mode, data, reset])

  if (!config) {
    return <div>Entity {config} not found</div>;
  }

  return config.renderForm({
    mode,
    data,
    onSubmit,
    formMethods,
  });
}
