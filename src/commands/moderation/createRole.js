const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "createrole",
  description: "This command creates a role with the name of what you say",
  category: "moderation",
  run: async (client, message, args) => {
    const conf = await client.getConfig(message.guild);
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You need `MANAGE_ROLES` permission.");
    }
    const roleName = args[0];

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I need `MANAGE_ROLES` permission.");
    }

    if (!roleName) {
      message.channel.send("Please specify a role name!");
    }
    if (roleName) {
      message.guild.roles.create({
        data: {
          name: roleName,
          color: "BLUE",
        },
      });

      const embed = new MessageEmbed()
        .setTitle(`Created Role: ${roleName}`)
        .setDescription(
          `${client.check}Successfully created the \`${roleName}\` role`
        )
        .setColor("BLUE")
        .setTimestamp();
      message.channel.send(embed);
    }
    let channel = conf.modlog;
    if (!channel) return;

    const embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", "create role")
      .addField("**Role**", roleName)
      .addField("**Created By**", message.author.username)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();

    let sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  },
};
