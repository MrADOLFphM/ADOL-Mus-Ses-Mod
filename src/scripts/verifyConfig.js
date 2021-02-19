const logger = require("../modules/logger");
let error = false;
module.exports = (config) => {
  logger.log("=-=-=-=-=-=-=- Config file Verification -=-=-=-=-=-=-=");
  if (!config.Token || config.Token.length === 0) {
    error = true;
    return logger.error("No discord bot token was provided");
  }
  if (!config.Mongo || config.Mongo.length === 0) {
    error = true;
    return logger.error("No Mongoose connect url was provided");
  }
  if (!config.news || config.news.length === 0)
    return logger.warn(
      "No news api key was provided. This may cause the news command not working!"
    );
  if (!config.dblkey || config.dblkey.length === 0) {
    if (config.dev) {
      return logger.warn("No top.gg api key was provided");
    } else {
      error = true;
      return logger.error("No top.gg api key was provided");
    }
  }
  if (!config.fortnite || config.fortnite.length === 0) {
    return logger.warn(
      "No fortnite api key was provided. This may cause the fortnite command not working!"
    );
  }
  if (!error) return logger.ready("Config file verified!");
};
