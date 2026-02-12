import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useEntityConfig from "../../hooks/useEntityConfig";
import EntityForm from "./EntityForm";

export default function EntityFormPage() {
  const { id } = useParams();
  const { config, error } = useEntityConfig();

  const mode = id ? "edit" : "create";

  const { data, isLoading } = useQuery({
    queryKey: [config?.name, id],
    queryFn: () => (id ? config!.api.getById(Number(id)) : null),
    enabled: !!config && !!id,
  });

  const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (payload: any) => {
    console.log("🚀 payload gửi lên:", payload);

    // Nếu là FormData → log từng field
    if (payload instanceof FormData) {
      for (const [key, value] of payload.entries()) {
        console.log(`📦 ${key}:`, value);
      }
    }

    return mode === "create"
      ? config!.api.create(payload)
      : config!.api.update(Number(id)!, payload);
  },

  onSuccess: async () => {
    if (mode === "edit") {
      await queryClient.invalidateQueries({
        queryKey: [config?.name, id],
      });
    }
  },
});


  if (error) return <div>{error}</div>;
  if (!config) return <div>Entity config not found</div>;
  if (mode === "edit" && isLoading) return <div>Loading...</div>;

  return (
    <EntityForm
      config={config}
      mode={mode}
      data={data}
      onSubmit={(payload) => mutation.mutate(payload)}
    />
  );
}
