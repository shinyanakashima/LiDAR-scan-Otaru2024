import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  
  // https://vitejs.dev/config/
export default defineConfig({
    base: '/LiDAR-scan-Otaru2024/',
    plugins: [react()],
    server: {
      allowedHosts: true,
    }
  });
  