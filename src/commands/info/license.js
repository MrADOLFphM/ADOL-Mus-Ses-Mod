const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "license",
  category: "info",
  description: "Shush",
  run: (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Andoi license")
      .setDescription(
        "Andoi has been licensed and you cannot host the bot locally or yourself (or stealing code without credits). Want to self host andoi? Ask Tovade#6617 and he will give the price to self host andoi!"
      )
      .setTimestamp();
    message.reply(embed);
  },
};
