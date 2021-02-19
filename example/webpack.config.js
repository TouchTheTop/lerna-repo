const base = require("../webpack.config");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

base.mode = "development";
base.entry = "/example/main.js";
base.performance = {
  hints: false,
};
base.devServer = {
  contentBase: path.resolve(__dirname, "./dist"), // 这里指的是服务器在哪个文件夹下起
  host: "localhost", // 服务器的IP地址，可以使用IP也可以使用localhost
  inline: true, // 看下文
  compress: true, // 是否起用服务端压缩
  port: 1717,
};
delete base.output;

base.plugins.push(
  new HtmlWebpackPlugin({
    template: "example/index.html",
    filename: "index.html",
    inject: true,
  })
);

module.exports = base;
