const Discord = require("discord.js");

module.exports = {
  name: "unban",
  description: "unban an member with their id",
  category: "moderation",
  usage: "unban <userID>",
  run: async (client, message, args) => {
    const conf = await client.getConfig(message.guild);
    const target = args[0];

    if (
      !message.member.hasPermission("BAN_MEMBERS") ||
      !message.member.hasPermission("ADMINISTRATOR")
    )
      return message.channel.send(
        `Sorry ${message.author.username}, but you don't have the perm BAN MEMBERS.`
      );

    const banList = await message.guild.fetchBans();
    const bannedUser = banList.get(target);

    if (!target) return message.channel.send("You need to specify a user id.");
    if (isNaN(target)) return message.channel.send("This is not a user id...");

    let reasonUnBanned = args.slice(1).join(" ") || "Reason not given.";

    message.guild.members.unban(target, reasonUnBanned);

    let unBanEmbed = new discord.MessageEmbed()
      .setTitle("Action : UnBan")
      .setDescription(`UnBanned (${target})`)
      .setColor("#ff2050")
      .setFooter(`UnBanned by ${message.author.tag}`);

    message.channel.send(unBanEmbed);
  },
};
