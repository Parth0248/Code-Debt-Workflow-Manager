import { commentPlugin } from "./eslint-plugin-validate-comments/index.js";
import typescriptParser from "@typescript-eslint/parser";
export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },

    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx"],
    plugins: {
      validateComment: commentPlugin,
    },
    rules: {
      "validateComment/validate-comment": "error",
    },
  },
  {
    ignores: [
      "rules/**",
      ".git/**",
      "/node_modules/",
      "/package-lock.json",
      "/package.json",
    ],
  },
];
