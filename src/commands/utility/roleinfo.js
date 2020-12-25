const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleinfo",
  category: "info",
  aliases: ["rinfo"],
  description: "shows stats of the mentioned role",
  usage: "[role name | role mention | ID]",
  run: async (client, message, args) => {
    let role = client.findRole(message, args, true);

    const status = {
      false: "No",
      true: "Yes",
    };

    let roleembed = new MessageEmbed()
      .setColor("#00ff00")
      .setAuthor("Role Info")
      .setThumbnail(message.guild.iconURL())
      .addField("**ID**", `\`${role.id}\``, true)
      .addField("**Name**", role.name, true)
      .addField("**Hex**", role.hexColor)
      .addField("**Members**", role.members.size)
      .addField("**Position**", role.position)
      .addField("**Mentionable**", status[role.mentionable])
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();

    message.channel.send(roleembed);
  },
};
