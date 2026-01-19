// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0",
//     port: 3001,
//     open: false,
//     watch: {
//       usePolling: true,
//     },
//     proxy: {
//       "/api": {
//         target:
//           process.env.DOCKER_ENV === "true"
//             ? process.env.VITE_API_URL || "http://backend:8080"
//             : process.env.VITE_API_URL || "http://localhost:8080",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
