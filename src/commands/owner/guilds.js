const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guilds",
  description: "View all guilds the bot is in",
  category: "owner",
  botOwnersOnly: true,
  aliases: ["servers"],
  run: (client, message) => {
    const guilds = client.guilds.cache;

    const embed = new MessageEmbed()
      .setTitle(`Guilds for ${client.user.username}`)
      .setColor("BLUE")
      .setFooter(message.author.tag);

    let description = "";
    guilds.forEach((guild) => {
      description += `**${guild.name}:** Id: ${guild.id}\n`;
    });

    embed.setDescription(description);

    message.channel.send({ embed });
  },
};
