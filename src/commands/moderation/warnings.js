const warnModel = require("../../models/warn");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.author;

    let warnings = await warnModel.findOne({
      GuildID: message.guild.id,
      UserID: user.id,
    });

    if (warnings === null)
      return message.channel.send("This user doesnt have any warnings!");
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .addField("\u200B", "\u200B");
    let data = [];
    for (let i = 0; warnings.warnings.length > i; i++) {
      data.push(`**ID:** ${i + 1}`);
      data.push(`**WARNING:** ${warnings.warnings[i]}`);
      data.push(
        `**MODERATOR:** ${await client.users.fetch(warnings.moderator[i])}`
      );
    }
    embed.setDescription(data.join("\n"));
    message.channel.send(embed);
  },
};
