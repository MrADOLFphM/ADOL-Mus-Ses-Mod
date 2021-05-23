const chalk = require("chalk");
const moment = require("moment");
const timestamp = `[${moment().format("HH:mm:ss")}]:`;
module.exports = class logger {
  static log(content) {
    console.log(
      `${timestamp} ${chalk.bgBlue("log".toUpperCase())} ${content} `
    );
  }
  static warn(content) {
    console.log(
      `${timestamp} ${chalk.black.bgYellow("warn".toUpperCase())} ${content} `
    );
  }
  static error(content) {
    console.log(
      `${timestamp} ${chalk.bgRed("error".toUpperCase())} ${content} `
    );
    process.exit(0);
  }
  static ready(content) {
    console.log(
      `${timestamp} ${chalk.black.bgGreen("ready".toUpperCase())} ${content}`
    );
  }
};
