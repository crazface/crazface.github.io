import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// Vite for GitHub Pages (user site): base should be "/"
// App source is in ./client, public assets in ./public
export default defineConfig(({ mode }) => ({
  // The app lives in /client
  root: path.resolve(__dirname, "client"),

  // User site lives at the domain root
  base: "/",

  publicDir: path.resolve(__dirname, "public"),

  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },

  build: {
    // Emit build to repo root /dist so Actions can upload it
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },

  plugins: [
    react(),
    // keep the express app ONLY during dev (vite serve)
    ...(mode === "serve" ? [expressPlugin()] : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // dev only
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
