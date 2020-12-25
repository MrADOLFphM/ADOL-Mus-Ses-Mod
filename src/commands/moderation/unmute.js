const muteDoc = require("../../models/mute");
module.exports = {
  name: "unmute",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Sorry but you do not have permission to unmute anyone"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the member to who you want to unmute"
      );
    }

    const m = await muteDoc.findOne({
      guildID: message.guild.id,
      memberID: user.id,
    });

    if (!m) return message.channel.send("User is not muted!");
    if (m) {
      for (const role of m.memberRoles) {
        user.roles.add(role.id);
      }
      const c = await client.getConfig(message.guild);
      user.roles.remove(c.muteRole);
      await message.channel.send(
        `**${message.mentions.users.first().username}** is unmuted`
      );
    }
  },
};
