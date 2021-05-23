const { MessageEmbed } = require("discord.js");
const { greenlight } = require("../../JSON/colours.json");

module.exports = {
  name: "say",
  category: "fun",
  noalias: [""],
  description: "Says your input via the bot",
  usage: "[text]",
  run: async (bot, message, args) => {
    try {
      if (args.length === 0)
        return message.channel.send("**Enter Some Text!**");
      setTimeout(() => message.delete(), 3000);

      const embed = new MessageEmbed()
        .setDescription(args.join(" "))
        .setColor(greenlight);

      message.channel.send(embed);
    } catch (e) {
      throw e;
    }
  },
};
