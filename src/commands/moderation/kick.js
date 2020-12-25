const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <raeson>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(
        `**${message.author.username}**, You do not have enough permission to use this command`
      );
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(
        `**${message.author.username}**, I do not have enough permission to use this command`
      );
    }

    let target =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
      message.guild.members.cache.find((m) => m.user.id === args[0]);

    if (!target) {
      return message.channel.send(
        `**${message.author.username}**, Please mention the person who you want to kick`
      );
    }

    if (target.id === message.author.id) {
      return message.channel.send(
        `**${message.author.username}**, You can not kick yourself`
      );
    }

    const reason = args[1];
    if (!reason) reason = "None";
    const conf = await client.getConfig(message.guild);
    let embed1 = new discord.MessageEmbed()
      .setTitle("Action: Kick")
      .setDescription(
        `${client.check}Kicked ${target} (${target.id}) for ${reason}`
      )
      .setColor("#ff2050")
      .setFooter(`Kicked by ${message.author.username}`);

    message.channel.send(embed1);

    target.kick(reason);
    let channel = conf.modlog;
    if (!channel) return;

    const embed = new discord.MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", "kick")
      .addField("**User Kicked**", target.user.username)
      .addField("**Kicked By**", message.author.username)
      .addField("**Reason**", `${reason || "**No Reason**"}`)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  },
};
