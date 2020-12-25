const { bugchannel } = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "report-bug",
  category: "utility",
  description: "report a bug to us",
  aliases: ["bg"],
  usage: "report-bug <bug>",
  run: (client, message, args) => {
    const bug = args.join(" ");

    if (!bug) return message.channel.send("Please provide a bug");

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${message.author.username} has reported a bug`)
      .setDescription(bug)
      .setFooter(message.author.username)
      .setTimestamp();

    client.channels.cache.get(bugchannel).send(embed);
    message.channel.send("bug reported thanks for your help");
  },
};
