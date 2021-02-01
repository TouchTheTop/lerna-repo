module.exports = {
  env: {
    test: {
      presets: [["@babel/preset-env", { targets: { node: true } }]],
      plugins: [
        ["@vue/babel-plugin-jsx", { mergeProps: false }],
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
      ],
    },
  },
};
