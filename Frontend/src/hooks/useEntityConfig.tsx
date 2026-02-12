import { useParams } from "react-router-dom";
import { getEntityConfig } from "../lib/entities";
import type { EntityConfig } from "../lib/entities/config/types";

export default function useEntityConfig() {
  const { entity } = useParams<{ entity: string }>();
  console.log("ENTITY PARAM =", entity);

  if (!entity) {
    return { config: undefined, error: "Entity not found" };
  }

  const config = getEntityConfig(entity);

  if (!config) {
    return { config: undefined, error: `Entity "${entity}" not registered` };
  }

  return { config: config as EntityConfig };
}
