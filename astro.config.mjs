// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "static",
  base: "/inno-sci-hub-custom",
  integrations: [
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [],
    build: {
      rollupOptions: {
        external: [
          "@/components/Head",
          "@/styles/global.css"
        ]
      }
    }
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ["static.wixstatic.com"],
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
