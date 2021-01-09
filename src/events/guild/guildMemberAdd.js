const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    const user = client.users.cache.get(member.id);
    const membercount = member.guild.memberCount;
    let conf = await client.getConfig(member.guild);
    const welcomeChannel = conf.welcomeChannel;
    if (welcomeChannel === null || welcomeChannel === undefined) {
      return;
    }
    const msg = conf.welcomemsg
      .replace("{user.username}", member.user.username)
      .replace("{server.name}", member.guild.name)
      .replace("{user}", member)
      .replace("{user.id}", member.user.id)
      .replace("{user.tag}", member.user.tag)
      .replace("{server.members}", member.guild.memberCount)
      .replace("{server.id}", member.guild.id);
    const embed = new MessageEmbed()
      .setTitle("👋 New Member!")
      .setDescription(msg)
      .setColor("BLUE")
      .setTimestamp()
      .setThumbnail(user.displayAvatarURL())
      .setFooter(`${client.user.username} welcome system!`);

    client.channels.cache.get(welcomeChannel).send(embed);
    //! autorole here
    let autoRole = db.get(`welcomerole_${member.guild.id}`);
    if (autoRole === null || !autoRole) return;
    if (autoRole) {
      member.roles.add(autoRole.id);
    }
  },
};
