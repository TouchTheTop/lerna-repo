// 修改router配置，以实现库的内部路由跳转

const Inquirer = require("inquirer");
const Commander = require("commander");
const Shell = require("shelljs");
const chalk = require("chalk");
const fs = require("fs");

const ROUTER_CONFIG_PATH = "./src/router/index.js";

const configRouter = function() {
  if (!Shell.test("-e", ROUTER_CONFIG_PATH)) {
    Shell.echo(`Sorry,${ROUTER_CONFIG_PATH} is not exist`);
    Shell.exit(1);
  }
  const config_source = fs.readFileSync(ROUTER_CONFIG_PATH).toString("utf-8");
  console.log(config_source);
};

configRouter();

module.exports = configRouter;
