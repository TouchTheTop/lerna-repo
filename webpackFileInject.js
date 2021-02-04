const path = require("path");
const glob = require("glob");
const fs = require("fs");
// 打包入口
const fileEntryPath = "/src/app.ts";
// 打包出口
const fileOutPath = "/dist";
// 需要忽略的打包入口
const ignorePaths = ["cli"];

// 生成packages
module.exports = function fileDisplay(filePath) {
  let entrys = {};
  //根据文件路径读取文件，返回文件列表
  const files = fs.readdirSync(filePath);
  //遍历读取到的文件列表
  files.forEach(function(filename) {
    if (filename.indexOf(".") < 0 && ignorePaths.indexOf(filename) < 0) {
      // 设置打包入口
      entrys[filename] = path.join(filePath, filename + fileEntryPath);
    }
  });
  return {
    entrys,
  };
};
