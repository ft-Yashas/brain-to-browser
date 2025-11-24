import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/brain-to-browser/",   // 👈 IMPORTANT: repo name here
  build: {
    outDir: "docs",             // 👈 build into /docs for GitHub Pages
  },
});
