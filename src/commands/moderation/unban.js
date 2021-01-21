const Discord = require("discord.js");

module.exports = {
  name: "unban",
  description: "unban an member with their id",
  category: "moderation",
  usage: "unban <userID>",
  run: async (client, message, args) => {
    const conf = await client.getConfig(message.guild);
    const lang = await message.guild.getLang();
    const target = args[0];

    if (
      !message.member.hasPermission("BAN_MEMBERS") ||
      !message.member.hasPermission("ADMINISTRATOR")
    )
      return message.channel.send(
        lang.NO_PERMS.replace("{perm}", "BAN_MEMBERS")
      );

    const banList = await message.guild.fetchBans();
    const bannedUser = banList.get(target);

    if (!target) return message.channel.send(lang.MODERATION.NO_ID);
    if (isNaN(target)) return message.channel.send(lang.MODERATION.NO_ID);

    let reasonUnBanned = args.slice(1).join(" ") || lang.NONE;

    message.guild.members.unban(target, reasonUnBanned);

    let unBanEmbed = new discord.MessageEmbed()
      .setTitle("Action : UnBan")
      .setDescription(`UnBanned (${target})`)
      .setColor("#ff2050")
      .setFooter(`UnBanned by ${message.author.tag}`);

    message.channel.send(unBanEmbed);
    await client.emit(
      "modlog",
      message.guild,
      client.users.cache.get(target).tag,
      "Unban",
      "None",
      message.member.user
    );
  },
};
