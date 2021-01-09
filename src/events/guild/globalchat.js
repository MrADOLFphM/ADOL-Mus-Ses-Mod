const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "message",
  async execute(client, message) {
    if (message.author.bot) return;
    const ste = await client.getConfig(message.guild);
    if (message.channel.id !== ste.global) return;
    message.delete();
    client.guilds.cache.forEach(async (guild) => {
      const conf = await client.getConfig(guild);
      if (conf.global === undefined || conf.global === null) return;

      const embed = new MessageEmbed()
        .setDescription(message.content)
        .setThumbnail(message.author.displayAvatarURL())
        .setFooter(message.author.username);
      try {
        const channel = guild.channels.cache.get(conf.global);
        channel.send(embed);
      } catch (err) {}
    });
  },
};
