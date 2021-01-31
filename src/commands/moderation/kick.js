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
        `${client.emotes.check}Kicked ${target} (${target.id}) for ${reason}`
      )
      .setColor("#ff2050")
      .setFooter(`Kicked by ${message.author.username}`);

    message.channel.send(embed1);

    target.kick(reason);
    await client.emit(
      "modlog",
      message.guild,
      target.user.username,
      "kick",
      "None",
      message.member.user
    );
  },
};
