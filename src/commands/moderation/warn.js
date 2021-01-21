const { MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warn");
module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    const conf = await client.getConfig(message.guild);
    const lang = await message.guild.getLang();
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        lang.NO_PERMS.replace("{perm}", "ADMINISTRATOR")
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(lang.MODERATION.NO_WARN_USER);
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send(lang.MODERATION.WARN_BOT);
    }

    if (message.author.id === user.id) {
      return message.channel.send(lang.MODERATION.CANNOT_WARN_YOURSELF);
    }

    if (user.id === message.guild.owner.id) {
      return message.channel.send(lang.MODERATION.WARN_OWNER);
    }

    const reason = args.slice(1).join(" ");

    if (!reason) reason = lang.NONE;

    let warnings = await warnModel.findOne({
      GuildID: message.guild.id,
      UserID: user.id,
    });

    if (warnings === 3) {
      return message.channel.send(
        `${message.mentions.users.first().username} ${
          lang.MODERATION.WARN_LIMIT
        }`
      );
    }

    if (warnings === null) {
      let aaa = new warnModel({
        GuildID: message.guild.id,
        UserID: user.id,
        warnings: [`${reason}`],
        moderator: [`${message.author.id}`],
      }); //kk
      aaa.save();
      user.send(
        lang.MODERATION.WARN_DM.replace("{guild}", message.guild.name).replace(
          "{reason}",
          reason
        )
      );
      await message.channel.send(
        lang.MODERATION.WARN_SUCCES.replace(
          "{user}",
          user.user.username
        ).replace("{reason}", reason)
      );
    } else if (warnings !== null) {
      warnings.warnings.push(reason);
      warnings.moderator.push(message.author.id);
      warnings.save();
      user.send(
        lang.MODERATION.WARN_DM.replace("{guild}", message.guild.name).replace(
          "{reason}",
          reason
        )
      );
      await message.channel.send(
        lang.MODERATION.WARN_SUCCES.replace(
          "{user}",
          user.user.username
        ).replace("{reason}", reason)
      );
    }
    await client.emit(
      "modlog",
      message.guild,
      user.user.username,
      reason,
      lang.MODERATION.WARN,
      message.member.user
    );
  },
};
