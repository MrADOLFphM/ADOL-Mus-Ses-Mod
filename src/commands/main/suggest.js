const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your Suggestion",
  category: "utility",
  run: async (client, message, args) => {
    let e = await client.getConfig(message.guild);
    let sugChannel = e?.suggestChan;
    const lang = await message.guild.getLang();
    if (!sugChannel) {
      return message.channel.send(lang.MAIN.SUGGEST_CHANNEL_NOT_SET);
    }

    if (!args.length) {
      return message.channel.send(lang.MAIN.GIVE_SUGGESTION);
    }

    let embed = new MessageEmbed()
      .setAuthor(
        "SUGGESTION: " + message.author.tag,
        message.author.avatarURL()
      )
      .setThumbnail(message.author.avatarURL())
      .setColor("#ff2050")
      .setDescription(args.join(" "))
      .setTimestamp();

    client.channels.cache
      .get(sugChannel)
      .send(embed)
      .then((m) => {
        m.react("851096788354203691");
        m.react("851096788567851038");
      });
  },
};
