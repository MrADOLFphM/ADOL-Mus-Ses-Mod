const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "membercount",
  category: "utility",
  description: "get the membercount of the server",
  aliases: ["memberc"],
  usage: "membercount",
  run: (client, message, args) => {
    const { name, memberCount } = message.guild;
    const bots = message.guild.members.cache.filter((mem) => mem.user.bot).size;
    const humans = message.guild.members.cache.filter((mem) => !mem.user.bot)
      .size;

    const embed = new MessageEmbed()
      .setTitle(`${name}'s Members`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp()
      .addField("**Total**", memberCount, true)
      .addField("**Humans**", humans, true)
      .addField("**Bots**", bots, true);

    message.channel.send({ embed });
  },
};
