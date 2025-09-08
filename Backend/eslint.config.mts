import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**", ".env"]
  },
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node
      },
    } 
  },
  {
      rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn"
    },
    settings: {
      react: { version: "detect" } // silences React version warning
    }
  },
  tseslint.configs.recommended,
  {
    files: ["Frontend/**/*.{jsx,tsx,js,ts}"],
    ...pluginReact.configs.flat.recommended,
  }
]);
