module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // TypeScript rules
    "plugin:react/recommended", // React rules
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint", // TypeScript plugin
    "react", // React plugin
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser", // Specify the TypeScript parser
      rules: {
        "@typescript-eslint/semi": ["off", "always"],
      },
    },
    {
      files: ["*.js", "*.jsx", "*.mjs", "*.cjs"],
      rules: {
        semi: ["off", "always"],
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // add custom rules here
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-var-requires": "off",
    semi: ["off", "always"],
    // "validate-comment-tags": ["error"], // Enable custom rule
  },
};
