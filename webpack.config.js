const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const webpackFileInject = require("./webpackFileInject");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    library: "Article",
    libraryTarget: "umd",
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
                modifyVars: {
                  "primary-color": "#1DA57A",
                },
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
    alias: {
      "@lerna-repo/util": path.join(__dirname, "./util"),
      "@lerna-repo/style": path.join(__dirname, "./style"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".md"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new VueLoaderPlugin(),
  ],
};
