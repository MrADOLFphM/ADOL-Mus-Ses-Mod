const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "roles",
  description: "See all the roles for this server",
  category: "utility",
  run: async (client, message, args) => {
    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) {
      const roles =
        message.guild.roles.cache
          .filter((r) => r.id !== message.guild.id)
          .map((r) => r)
          .join(",\n") || "None";

      const embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Roles`)
        .setDescription(
          `${roles.length > 2048 ? roles.slice(0, 2030) + "..." : roles}`
        )
        .setTimestamp()
        .setFooter(message.author.username)
        .setColor("BLUE");

      message.channel.send(embed);
    } else {
      let membersWithRole = message.guild.members.cache
        .filter((member) => {
          return member.roles.cache.find((r) => r.name === role.name);
        })
        .map((member) => {
          return member.user.tag;
        });
      if (membersWithRole > 2048)
        return message.channel.send("**List Is Too Long!**");

      let roleEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(message.guild.iconURL())
        .setTitle(`Users With The ${role.name} Role!`)
        .setDescription(membersWithRole.join("\n"));
      message.channel.send(roleEmbed);
    }
  },
};
