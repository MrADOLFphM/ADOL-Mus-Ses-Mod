const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(client, member) {
    if (!member.guild) return;
    const conf = await client.getConfig(member.guild);
    const leaveChannel = conf.leaveChannel;

    // not enabled
    if (leaveChannel === null || !leaveChannel) return;

    // channel not found/deleted
    const msg = conf.leavemsg
      .replace("{user.username}", member.user.username)
      .replace("{server.name}", member.guild.name)
      .replace("{user}", member)
      .replace("{user.id}", member.user.id)
      .replace("{user.tag}", member.user.tag)
      .replace("{server.members}", member.guild.memberCount)
      .replace("{server.id}", member.guild.id);
    const embed = new MessageEmbed()
      .setTitle("👋 Goodbye!")
      .setDescription(msg)
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(client.user.username);

    client.channels.cache.get(leaveChannel).send({ embed });
  },
};
