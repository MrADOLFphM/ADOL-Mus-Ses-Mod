const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "messageReactionAdd",
  async execute(client, reaction, user) {
    try {
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;
      const guild = await reaction.message.guild.getVerify();
      if (!guild) return;
      const isReact = guild.type;
      const channel_id = guild.channel;
      const status = guild.enabled;
      const role = guild.role;
      if (
        !role ||
        !status ||
        channel_id !== reaction.message.channel.id ||
        isReact !== "react" ||
        reaction.emoji.name !== "andoiCheck" ||
        !reaction.message.guild.me.permissions.has(["MANAGE_ROLES"])
      )
        return;
      const member = await reaction.message.guild.members.fetch(user.id);
      if (member) {
        member.roles.add(role).catch(() => {});
        reaction.message.channel
          .send(
            new MessageEmbed()
              .setColor(0x00ff00)
              .setTimestamp()
              .setDescription(`You have been verified <@${user.id}>`)
          )
          .then(async (m) => {
            await m.delete({ timeout: 5000 }).catch(() => {});
          });
      }
    } catch (e) {
      client.logger.error(e);
    }
  },
};
