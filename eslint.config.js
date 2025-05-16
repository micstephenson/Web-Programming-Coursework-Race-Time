import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";

export default [
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, ...js.configs.recommended },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ["**/*.json"], plugins: { json }, ...json.configs.recommended },
  { files: ["**/*.jsonc"], plugins: { json }, ...json.configs.recommended },
  { files: ["**/*.css"], plugins: { css }, ...css.configs.recommended },
];