import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/irisns/" : "/",
  appType: "spa",
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@ui": resolve(__dirname, "src/components/ui"),
      "@layout": resolve(__dirname, "src/components/layout"),
      "@data": resolve(__dirname, "src/components/data"),
      "@features": resolve(__dirname, "src/components/features"),
      "@app": resolve(__dirname, "src/app"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@lib": resolve(__dirname, "src/lib"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
}));
