const helper = require("../../helpers/calculator");

module.exports = {
  name: "calculate",
  aliases: ["calc", "calculator"],
  description: "Shows Calculated Answers Of User's Query",
  category: "fun",
  run: async (bot, message, args) => {
    await helper(message);
  },
};
