const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const webpackFileInject = require("./webpackFileInject");
const babelConfig = {
  cacheDirectory: true,
  presets: [
    "@vue/cli-plugin-babel/preset",
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
    "@babel/preset-typescript",
  ],
  plugins: ["@vue/babel-plugin-jsx"],
};

const pathsWebpack = webpackFileInject(path.resolve(__dirname, "./packages"));

module.exports = {
  mode: "production",
  entry: pathsWebpack.entrys,
  output: {
    path: path.resolve(__dirname, "./packages/"),
    filename: "[name]/dist/app.js",
    library: "Article111",
    libraryTarget: "umd",
    libraryExport: "default",
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
    alias: {
      "lerna-repo/util": path.join(__dirname, "./util"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".md"],
  },
  plugins: [new VueLoaderPlugin()],
};
