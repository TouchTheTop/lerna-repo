module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint-config-ali",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:vue/recommended",
    "eslint:recommended",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-unused-vars": "off",
    "prettier/prettier": "error",
    strict: "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "require-yield": "off",
  },
  plugins: ["prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
};
