#!/usr/bin/env node

const program = require('commander'); // 命令行工具
const chalk = require('chalk'); // 命令行输出美化
const didYouMean = require('didyoumean'); // 简易的智能匹配引擎
const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages.js');

didYouMean.threshold = 0.6;

program
  .version(require('../package').version, '-v, --version') // 版本
  .usage('<command> [options]'); // 使用信息

// 初始化项目模板
program
  .command('create <template-name> <project-name>')
  .description('create a new project from a template')
  .action((templateName, projectName, cmd) => {
    // 输入参数校验
    validateArgsLen(process.argv.length, 5);
    require('../lib/zhaowa-create')(lowercase(templateName), projectName);
  });

// 处理非法命令
program.arguments('<command>').action(cmd => {
  // 不退出输出帮助信息
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
});

// 重写commander某些事件
enhanceErrorMessages('missingArgument', argsName => {
  return `Missing required argument ${chalk.yellow(`<${argsName}>`)}`;
});

program.parse(process.argv); // 把命令行参数传给commander解析

function suggestCommands(cmd) {
  const avaliableCommands = program.commands.map(cmd => {
    return cmd._name;
  });
  // 简易智能匹配用户命令
  const suggestion = didYouMean(cmd, avaliableCommands);
  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
}

function lowercase(str) {
  return str.toLocaleLowerCase();
}

function validateArgsLen(argvLen, maxArgvLens) {
  if (argvLen > maxArgvLens) {
    console.log(
      chalk.yellow(
        '\n Info: You provided more than argument. the rest are ignored.'
      )
    );
  }
}
