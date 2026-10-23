import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.js"],
    plugins: { js },
    rules: js.configs.recommended.rules,
    languageOptions: {
      globals: globals.browser,
    },
  },
]);

