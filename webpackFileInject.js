const path = require("path");
const glob = require("glob");
const fs = require("fs");
const fileEntryPath = "/src/app.ts";
const fileOutPath = "/dist";

function _path(str) {
  return path.resolve(__dirname, str);
}

function initpkg(dirname) {
  var path = _path("./packages/" + dirname);
  const packPath = _path("./components/" + dirname + "/package.json");
  const packContent = fs.readFileSync(packPath);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  fs.writeFileSync(path + "/package.json", packContent);
}

// 生成packages
module.exports = function fileDisplay(filePath) {
  let entrys = {};
  //根据文件路径读取文件，返回文件列表
  const files = fs.readdirSync(filePath);
  //遍历读取到的文件列表
  files.forEach(function(filename) {
    if (filename.indexOf(".") < 0) {
      // 设置打包入口
      entrys[filename] = path.join(filePath, filename + fileEntryPath);
      // 生成packages文件
      initpkg(filename);
    }
  });
  return {
    entrys,
  };
};
