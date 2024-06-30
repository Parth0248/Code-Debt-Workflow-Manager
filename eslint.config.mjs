// import pluginJs from "@eslint/js";
import { commentPlugin } from "./eslint-plugin-validate-comments/index.js";
import typescriptParser from "@typescript-eslint/parser";
export default [
  // pluginJs.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
    },

    // languageOptions: {
    //   parserOptions: {
    //     sourceType: "module",
    //     ecmaFeatures: {
    //       jsx: true,
    //       ts: true,
    //       tsx: true,
    //     },
    //     ecmaVersion: 14,
    //   },
    // },

    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx"],
    plugins: {
      // "@typescript-eslint": typescriptPlugin,
      validateComment: commentPlugin,
    },
    rules: {
      // "@typescript-eslint/semi": ["off", "always"],
      // "@typescript-eslint/no-unused-vars": "off",
      // "@typescript-eslint/no-var-requires": "off",
      "validateComment/validate-comment": "warn",
    },
  },
  {
    ignores: [
      "rules/**",
      ".git/**",
      "/node_modules/",
      "/package-lock.json",
      "/package.json",
      // "utils/**",
    ],
  },
];
