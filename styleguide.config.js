// styleguide.config.js
module.exports = {
  title: "Default Style Guide", // 文档的标题
  components: "packages/core/**/*.vue", // 组件的目录
  defaultExample: false, // 是否使用默认样例
  usageMode: "expand", // 是否展开用法
  exampleMode: "expand", // 是否展开示例代码
  styleguideDir: "guide", // 打包的目录
  codeSplit: true, // 打包时是否进行分片
  skipComponentsWithoutExample: false, // 是否跳过没有样例的组件
  webpackConfig: require("./webpack.config.js"),
};
