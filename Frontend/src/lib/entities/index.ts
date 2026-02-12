import { cache } from "react";
import type { EntityConfig } from "./config/types";

import { courtConfig } from "./config/court.config";
import { productConfig} from "./config/product.config"

export type EntityVariant = {
  [key: string]: EntityConfig;
};

export const entities: Record<string, EntityConfig> = {
  courts: courtConfig,
  products: productConfig,
};

export const getEntityConfig = cache(
  (name: string): EntityConfig | EntityVariant | undefined => {
    return entities[name];
  },
);
