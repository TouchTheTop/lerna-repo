#!/usr/bin/env node

const Inquirer = require("inquirer");
const Commander = require("commander");
const Shell = require("shelljs");
const chalk = require("chalk");

const packageSource = require("../config");

const sourcePrompt = [
  {
    type: "checkbox",
    name: "needSourceList",
    message: "请选择要引入的资源",
    choices: ["海报", "文章"],
  },
];

const SUB_PATH = "./jt-packages";
// 需要整合的资源包列表 TODO:存入Node环境变量中
let needSourceList = [];
// 需要更新的资源包列表 TODO:存入Node环境变量中
let updateSourceList = [];
// TODO:考虑多个项目工程中的变量 空间

// 初始化目录及清除工作
function init() {
  if (!Shell.which("git")) {
    Shell.echo("Sorry,this script requires git");
    Shell.exit(1);
  }

  if (Shell.test("-e", SUB_PATH)) {
    Inquirer.prompt([
      {
        type: "confirm",
        message: ` 是否需要更新？`,
        name: "cover",
        prefix: `资源包已引入`,
      },
    ]).then((answers) => {
      answers.cover && pullPackages();
    });
  } else {
    Shell.mkdir(SUB_PATH);
    pullPackages();
  }
}

// 获取需要整合的业务资源地址
function getSources() {
  return needSourceList.map(function(v) {
    const s = packageSource[v];
    if (!s) {
      console.log(chalk.red(`Error: this source of ${v} is not exit`));
      Shell.exit(1);
    }
    return s;
  });
}

// 拉取扩展包
function pullPackages() {
  const sources = getSources();
  let tip = "引入";
  sources.forEach(function(source) {
    const path = "HTML5";
    const source_path = `${SUB_PATH}/${path}`;
    let command = ``;
    if (Shell.test("-e", source_path)) {
      command = `cd ${source_path} 
                 git pull ${source}`;
      tip = "更新";
    } else {
      Shell.mkdir(source_path);
      command = `
        cd ${SUB_PATH}
        git init
        git clone ${source}
      `;
    }
    if (Shell.exec(command).code !== 0) {
      console.log(chalk.red(`Error: Something is Wrong With the ${source}`));
      Shell.exit(1);
    }
  });
  console.log(chalk.green(`${tip}${needSourceList}成功`));
  Shell.exit(1);
}

function update() {
  console.log(chalk.gray(`更新资源包`));
}

// 初始化整合
Commander.command("init")
  .alias("i")
  .description("资源包整合")
  .action(() => {
    Inquirer.prompt(sourcePrompt).then((answers) => {
      needSourceList = answers.needSourceList;
      init();
    });
  });
// 更新资源包
Commander.command("update")
  .alias("u")
  .description("更新资源包")
  .action(() => {
    if (!needSourceList.length) {
      console.log(chalk.yellow("当前没有可更新的资源"));
      Shell.exit(0);
    }
    const sourceUpdatePrompt = [
      {
        type: "checkbox",
        name: "updateSourceList",
        message: "请选择要整合的业务",
        choices: needSourceList,
      },
    ];

    Inquirer.prompt(sourceUpdatePrompt).then((answers) => {
      updateSourceList = answers.updateSourceList;
      update();
    });
  });

Commander.parse(process.argv);
