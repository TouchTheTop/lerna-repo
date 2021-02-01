const VueLoaderPlugin = require("vue-loader/lib/plugin");
const babelConfig = {
  cacheDirectory: true,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [
            "last 2 versions",
            "Firefox ESR",
            "> 1%",
            "ie >= 11",
            "iOS >= 8",
            "Android >= 4",
          ],
        },
      },
    ],
    "@vue/cli-plugin-babel",
    [
      "@vue/babel-preset-jsx",
      {
        injectH: false,
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "article",
        libraryDirectory: "", // default: lib
        style: true,
      },
    ],
    ["@vue/babel-plugin-jsx", { mergeProps: false }],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
  ],
};

module.exports = {
  mode: "development",
  entry: {
    app: "./src/app.ts",
  },
  output: {
    library: "Article",
    libraryTarget: "amd",
  },
  module: {
    rules: [
      {
        test: /\.(vue|md)$/,
        loader: "vue-loader",
        exclude: /\.(en-US.md|zh-CN.md)$/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: babelConfig,
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /pickr.*js/,
        options: babelConfig,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".md"],
  },
  plugins: [new VueLoaderPlugin()],
};
