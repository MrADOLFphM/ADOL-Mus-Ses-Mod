const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"
        );
      if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"
        );
      if (!args[0])
        return message.channel.send("**Please Provide A User To Ban!**");

      let banMember =
        message.mentions.members.first() ||
        client.users.cache.get(args[0]) ||
        client.users.cache.find(
          (r) => r.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        client.users.cache.find(
          (r) => r.tag.toLowerCase() === args[0].toLowerCase()
        );
      if (banMember === message.member)
        return message.channel.send("**You Cannot Ban Yourself**");

      var reason = args.slice(1).join(" ");
      const check = client.emojis.cache.find(
        (emoji) => emoji.name === "andoiCheck"
      );
      const cross = client.emojis.cache.find(
        (emoji) => emoji.name === "andoiCross"
      );
      if (!banMember.bannable)
        return message.channel.send(`${cross}**Cant Ban That User**`);
      try {
        if (banMember.user.bot) {
          message.guild.members.ban(banMember, { days: 7, reason: reason });
        } else {
          banMember
            .send(
              `**Hello, You Have Been Banned From ${message.guild.name} for - ${
                reason || "No Reason"
              }**`
            )
            .then(() =>
              message.guild.members.ban(banMember, { days: 7, reason: reason })
            )
            .catch(() => null);
        }
      } catch {
        message.guild.members.ban(banMember, { days: 7, reason: reason });
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `${check}**${banMember.user.username}** has been banned for ${reason}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `${check}**${banMember.user.username}** has been banned`
          );
        message.channel.send(sembed2);
      }
      await client.emit(
        "modlog",
        message.guild,
        banMember.user.tag,
        "Ban",
        "None",
        message.member.user
      );
    } catch (e) {
      return message.channel.send(`${cross}**${e.message}**`);
    }
  },
};
