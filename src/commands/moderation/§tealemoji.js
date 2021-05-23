const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
  name: "stealemoji",
  category: "moderation",
  usage: "stealemoji <emoji> <custom name>",
  description: "Steal an emoji from a different server",
  botPermissions: ["MANAGE_EMOJIS"],
  memberPermissions: ["MANAGE_EMOJIS"],
  requiredArgs: ["emoji"],
  run: async (client, message, args) => {
    const emoji = args[0];
    const name = args.slice(1).join(" ");
    const lang = await message.guild.getLang();
    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || "give_name");

        const embed = new MessageEmbed()
          .setTitle("Emoji Added")
          .setDescription(
            `${
              client.emotes.succes
            }${lang.MODERATION.UPLOADED_EMOJI_SUCCES.replace(
              "{name}",
              name || "give_name"
            )}`
          );
        return message.channel.send(embed);
      }

      const customEmoji = Util.parseEmoji(emoji);

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
          customEmoji.animated ? "gif" : "png"
        }`;

        await message.guild.emojis.create(
          `${link}`,
          `${name || `${customEmoji.name}`}`
        );
        const embed = new MessageEmbed().setDescription(
          lang.MODERATION.EMOJI_ADDED.replace("{url}", link)
        );
        return message.channel.send(embed);
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) {
          return message.channel.send(lang.MODERATION.VALID_EMOJI);
        }

        message.channel.send(lang.MODERATION.NORMAL_EMOJI);
      }
    } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Maximum number of emojis reached (50)"
        )
      ) {
        return message.channel.send(lang.MODERATION.MAX_EMOJI);
      } else {
        return message.channel.send(lang.ERROR);
      }
    }
  },
};
