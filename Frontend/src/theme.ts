import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark", 
    primary: {
      main: "#13ec5b", 
    },
    background: {
      default: "#102216", 
      paper: "#1a2e21",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});
