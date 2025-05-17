import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const getDirname = (url) => path.dirname(new URL(url).pathname);

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(getDirname(import.meta.url), "src"),
      "@shared": path.resolve(getDirname(import.meta.url), "../shared"),
      "@assets": path.resolve(getDirname(import.meta.url), "../attached_assets"),
    },
  },
  root: path.resolve(getDirname(import.meta.url)),
  build: {
    outDir: path.resolve(getDirname(import.meta.url), "dist/"),
    emptyOutDir: true,
  },
});
