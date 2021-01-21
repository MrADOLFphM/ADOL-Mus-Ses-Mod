const muteDoc = require("../../models/mute");
module.exports = {
  name: "unmute",
  category: "moderation",
  run: async (client, message, args) => {
    const lang = await message.guild.getLang();
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        lang.NO_PERMS.replace("{perm}", "MANAGE_ROLES")
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        lang.I_PERMS.repalce("{perm}", "MANAGE_ROLES")
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(lang.NO_USER);
    }

    const m = await muteDoc.findOne({
      guildID: message.guild.id,
      memberID: user.id,
    });

    if (!m) return message.channel.send(lang.MODERATION.USER_NOT_MUTED);
    if (m) {
      for (const role of m.memberRoles) {
        user.roles.add(role.id);
      }
      const c = await client.getConfig(message.guild);
      user.roles.remove(c.muteRole);
      await message.channel.send(
        lang.MODERATION_MUTE_SUCCES.replace("{user}", user.user.username)
      );
    }
    await client.emit(
      "modlog",
      message.guild,
      user.user.username,
      "unmute",
      "None",
      message.member.user
    );
  },
};
