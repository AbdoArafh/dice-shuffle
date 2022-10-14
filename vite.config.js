import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/dice-shuffle/",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
});
