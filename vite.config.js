import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/dice-shuffle/",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["dice.gltf"],
      manifest: {
        name: "Dice Shuffle 3D",
        short_name: "Dice Shuffle",
        description: "an app to shuffle a dice and get a random number",
        theme_color: "#000000",
        background_color: "#000000",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
