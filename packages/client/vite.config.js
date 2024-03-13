import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "@": resolve("./src"),
        "@assets": resolve("./src/components"),
        "@components": resolve("./src/components"),
        "@constants": resolve("./src/constants"),
        "@contexts": resolve("./src/contexts"),
        "@pages": resolve("./src/pages"),
        "@routes": resolve("./src/routes"),
        "@services": resolve("./src/services"),
        "@types": resolve("./src/types"),
        "@utils": resolve("./src/utils"),
      },
    },
    plugins: [react()],
  };
});
