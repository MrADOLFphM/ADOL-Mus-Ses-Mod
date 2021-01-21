const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "removerole",
  category: "moderation",
  description: "remove a role from mentioned user or with given id",
  aliases: ["rr"],
  usage: "removerole <role> <user> or removerole <id> <role>",
  run: async (client, message, args) => {
    const conf = await client.getConfig(message.guild);
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        "**Your Dont Have The Permissions To Remove Role From Users! - [MANAGE_ROLES]**"
      );

    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        "**I Dont Have The Permissions To Remove Roles From Users! - [MANAGE_ROLES]**"
      );

    if (!args[0]) return message.channel.send("**Please Enter A User!**");

    let rMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!rMember) return message.channel.send("**Couldn't Find That User**");

    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args[1]) ||
      message.guild.roles.cache.find(
        (rp) =>
          rp.name.toLowerCase() === args.slice(1).join(" ").toLocaleLowerCase()
      );
    if (!args[1]) return message.channel.send("**Please Enter A Role!**");

    if (!role) return message.channel.send("**Couldn't Find That Role**");

    if (
      rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
      0
    )
      return message.channel.send(
        "**Cannot Remove Role From This User! - [Higher Than Me In Role Hierachy]**"
      );
    if (message.guild.me.roles.highest.comparePositionTo(role) < 0)
      return message.channel.send(
        "**Role Is Currently Higher Than Me Therefore Cannot Remove It From The User!**"
      );
    if (role.managed)
      return message.channel.send(
        "**Cannot Remove That Role From This User!**"
      );

    if (!rMember.roles.cache.has(role.id))
      return message.channel.send("**User Doesnt Has The Role!**");
    if (rMember.roles.cache.has(role.id)) await rMember.roles.remove(role.id);

    const sembed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setDescription(
        `${client.emotes.success}Role has been removed from ${rMember.user.username}`
      );
    message.channel.send(sembed);

    await client.emit(
      "modlog",
      message.guild,
      rMember.user.username,
      "remove-role",
      "None",
      message.member.user
    );
  },
};
