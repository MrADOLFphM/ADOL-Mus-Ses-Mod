const { MessageEmbed } = require("discord.js");
const canvas = require("discord-canvas");
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
    const msg = conf?.welcomemsg
      .replace("{user.username}", member.user.username)
      .replace("{server.name}", member.guild.name)
      .replace("{user}", member)
      .replace("{user.id}", member.user.id)
      .replace("{user.tag}", member.user.tag)
      .replace("{server.members}", member.guild.memberCount)
      .replace("{server.id}", member.guild.id);
    if (msg) {
      const embed = new MessageEmbed()
        .setTitle("👋 New Member!")
        .setDescription(msg)
        .setColor("BLUE")
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL())
        .setFooter(`${client.user.username} welcome system!`);

      client.channels.cache.get(welcomeChannel).send(embed);
    } else {
      const avatar = member.user.displayAvatarURL({ dynamic: true });
      const membercount = member.guild.memberCount;
      let image = new canvas.Welcome()
        .setUsername(member.user.username)
        .setDiscriminator(member.discriminator)
        .setMemberCount(membercount)
        .setGuildName(member.guild.name)
        .setAvatar(avatar)
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setBackground(
          "https://www.osustuff.org/img/imageslice/2020-09-22/128949/710153.jpg"
        )
        .toAttachment();

      let attachment = new MessageAttachment(
        image.toBuffer(),
        "welcome-image.png"
      );
      client.channels.cache.get(welcomeChannel).send(attachment);
    }
    //! autorole here
  },
};
