import { Box, Tabs, Tab } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useEntityConfig from "../../hooks/useEntityConfig";
import EntityDataGrid from "./EntityDataGrid";

export default function Dashboard() {
  const { config, parentConfig, variant } = useEntityConfig();
  const { entity } = useParams();

  const navigate = useNavigate();

  if (!config) {
    return (
      <Box p={2}>
        <h2>Chưa tạo</h2>
        <p>URL entity: {entity}</p>
      </Box>
    );
  }

  return (
    <Box p={2}>
      {parentConfig && (
        <Tabs
          value={variant}
          onChange={(_, v) => navigate(`/dashboard/${entity}/${v}`)}
        >
          {Object.entries(parentConfig).map(([key, cfg]) => (
            <Tab key={key} value={key} label={cfg.label} />
          ))}
        </Tabs>
      )}

      <EntityDataGrid config={config} />
    </Box>
  );
}
