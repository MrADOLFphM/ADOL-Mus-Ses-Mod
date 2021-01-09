const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "randomcolor",
  description: "Get a random color",
  category: "utility",
  aliases: ["color"],
  run: (client, message) => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const preview = `https://api.no-api-key.com/api/v2/color?hex=${color}`;

    const embed = new MessageEmbed()
      .setThumbnail(preview)
      .setTimestamp()
      .setFooter(message.author.username)
      .setColor(color)
      .setTitle(color);

    message.channel.send(embed);
  },
};
