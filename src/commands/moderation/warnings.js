const warnModel = require("../../models/warn");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.author;
    const lang = await message.guild.getLang();
    let warnings = await warnModel.findOne({
      GuildID: message.guild.id,
      UserID: user.id,
    });

    if (warnings === null)
      return message.channel.send(lang.MODERATION.NO_WARNINGS);
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .addField("\u200B", "\u200B");
    let data = [];
    for (let i = 0; warnings.warnings.length > i; i++) {
      data.push(`**${lang.MODERATION.ID}:** ${i + 1}`);
      data.push(`**${lang.MODERATION.WARNING}:** ${warnings.warnings[i]}`);
      data.push(
        `**${lang.MODLOG.MODERATOR}:** ${await client.users.fetch(
          warnings.moderator[i]
        )}`
      );
    }
    embed.setDescription(data.join("\n"));
    message.channel.send(embed);
  },
};
