module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "import"],
  extends: [
    "airbnb-typescript",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jest/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "17.0.2",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "react/prop-types": "off",
  },
};
