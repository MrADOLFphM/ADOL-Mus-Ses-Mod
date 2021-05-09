const Discord = require("discord.js");

module.exports = {
  name: "softban",
  description: "Soft Ban a User",
  category: "moderation",

  async run(client, message, args) {
    message.delete();

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "You do not have permission to perform this command!"
      );
    if (!message.guild.me.permissions.has("BAN_MEMBERS"))
      return message.channel.send(
        "I don't have permission to perform this command"
      );

    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banMember)
      return message.channel.send("Please provide a user to ban!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    banMember
      .send({
        embed: {
          color: "#ff0019",
          description: `Hello, you have been banned from ${message.guild.name} for: ${reason}`,
        },
      })
      .then(() =>
        message.guild
          .member(banMember)
          .ban(banMember, { days: 1, reason: reason })
      )
      .then(() =>
        message.guild.members
          .unban(banMember.id)
          .catch((err) => console.log(err))
      );

    await client.emit(
      "modlog",
      message.guild,
      banMember.user.username,
      "softban",
      reason,
      message.member.user
    );
    message.channel.send({
      embed: {
        color: "#10de47",
        description: ` ${banMember.user.username} has successfully been soft banned from the server.`,
      },
    });
  },
};
