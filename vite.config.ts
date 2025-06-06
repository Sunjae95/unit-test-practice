/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/unit-test-practice/",
  plugins: [react()],
  test: {
    environment: "happy-dom",
  },
});
