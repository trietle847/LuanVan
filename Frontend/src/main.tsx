// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import CssBaseline from "@mui/material/CssBaseline";

// import "./index.css";
// import App from "./App";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//         <CssBaseline />
//         <App />
//     </BrowserRouter>
//   </StrictMode>
// );

// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

const theme = createTheme({
  palette: {
    primary: {
      main: "#19e66b",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);