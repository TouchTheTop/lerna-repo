const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "qytbase-article",
        libraryDirectory: "", // default: lib
        style: true,
      },
    ],
    ["@vue/babel-plugin-jsx", { mergeProps: false }],
  ],
};

module.exports = {
  mode: "development",
  entry: {
    app: "./index.ts",
  },
  module: {
    rules: [
      {
        test: /\.(vue|md)$/,
        loader: "vue-loader",
        exclude: /\.(en-US.md|zh-CN.md)$/,
      },
      {
        test: /\.(en-US.md|zh-CN.md)$/,
        use: [{ loader: "vue-loader" }, { loader: "./loader.js" }],
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
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".md"],
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: "/index.html" }],
    },
    disableHostCheck: true,
    hot: true,
    open: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new VueLoaderPlugin(),
  ],
};
