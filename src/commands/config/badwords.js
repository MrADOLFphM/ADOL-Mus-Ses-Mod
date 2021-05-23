module.exports = {
  name: "blacklistedwords",
  description: "Add/remove blacklisted words",
  category: "config",
  options: ["get", "add", "remove"],
  memberPermissions: ["ADMINISTRATOR"],
  aliases: ["wordsfilter", "filterwords"],
  run: async (client, message, args) => {
    const option = args[0];
    const item = args[1];
    const guildId = message.guild;
    const guild = await client.getConfig(message.guild);
    const blacklistWords = guild.badwords;
    const lang = message.guild.getLang();
    if (!option) {
      return message.channel.send(lang.CONFIG.BLACKLISTED_PROVIDE_OPTION);
    }

    switch (option) {
      case "add": {
        if (blacklistWords.includes(item)) {
          return message.channel.send(
            lang.CONFIG.BLACKLISTED_ALREADY_EXISTS.replace("{item}", item)
          );
        }
        if (blacklistWords === null || !blacklistWords) {
          await client.updateConfig(guildId, {
            badwords: [...guild.blacklistWords, item],
          });
        } else {
          await client.updateConfig(guildId, {
            badwords: [item],
          });
        }

        return message.channel.send(
          lang.CONFIG.BLACKLISTED_ADDED.replace("{item}", item)
        );
      }
      case "remove": {
        if (blacklistWords !== null) {
          if (!blacklistWords.includes(item)) {
            return message.channel.send(
              lang.CONFIG.BLACKLISTED_NOT_EXISTS.replace("{item}", item)
            );
          }

          const words = blacklistWords.filter(
            (w) => w.toLowerCase() !== item.toLowerCase()
          );

          await client.updateConfig(guildId, { badwords: words });

          return message.channel.send(
            lang.CONFIG.BLACKLISTED_REMOVED.replace("{item}", item)
          );
        } else {
          return message.channel.send("There are no blacklisted words yet.");
        }
      }
      case "get": {
        const words =
          blacklistWords !== null &&
          blacklistWords.map((w) => `\`${w}\``).join(", ");
        return message.channel.send(words || lang.CONFIG.BLACKLISTED_NO_WORDS);
      }
      default: {
        return message.channel.send(
          lang.CONFIG.OPTION_DOES_NOT_EXIST.replace("{option}", option)
        );
      }
    }
  },
};
