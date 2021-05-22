const discord = require("discord.js");
const app = require("../../models/application/applied.js");
const ReactionMenu = require("../../structures/reactionmenu");
module.exports = {
  name: "review",
  aliases: ["rev"],
  description: "Review applications.",
  category: "application",
  memberPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    const conditional = {
      guildID: message.guild.id,
      hasApplied: true,
    };
    const results = await app.find(conditional);
    const array = [];
    if (!results.length) return message.channel.send("No applications!");
    if (results && results.length) {
      for (const result of results) {
        try {
          const member = await message.guild.members.fetch(result.userID);

          array.push(
            `Application #${result.appID} | Submitter: ${member.user.tag}`
          );
        } catch {}
      }
    }
    const interval = 15;

    const embed = new discord.MessageEmbed()
      .setTitle(`Applications - Review`)
      .setDescription(
        `\`\`\`\n${array.join("\n\n")}\`\`\`` || "No Pending Applications Found"
      )
      .setColor("GREEN")
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

    if (array.length <= interval) {
      const range = array.length == 1 ? "[1]" : `[1 - ${array.length}]`;
      message.channel.send(
        embed
          .setTitle(`Applications - Review ${range}`)
          .setDescription(
            `\`\`\`\n${array.join("\n\n")}\`\`\`` ||
              "No Pending Applications Found"
          )
          .setColor("GREEN")
          .setFooter(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
      );
    } else {
      embed
        .setTitle(`Applications - Review`)
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(
        client,
        message.channel,
        message.member,
        embed,
        array,
        interval
      );
    }
  },
};
