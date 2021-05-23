const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "uptime",
  category: "info",
  description: "check how long the bot has been online for",
  aliases: ["up"],
  usage: "uptime",
  run: (client, message, args) => {
    const moment = require("moment");
    require("moment-duration-format");
    const duration = moment
      .duration(client.uptime)
      .format(" D [days], H [hours], m [minutes], s [seconds]");
    message.channel.send(
      new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("Uptime")
        .setDescription(duration)
        .setColor("BLURPLE")
    );
  },
};
