const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "permissions",
  category: "utility",
  aliases: ["perms"],
  run: async (client, message, args) => {
    const user = message.author;
    const member = await message.guild.members.fetch(user);

    const perms = member.permissions.toArray();
    let permstext = "";
    if (perms.indexOf("ADMINISTRATOR") === -1) {
      permstext = perms.join(", ") || "Without permissions.";
    } else {
      permstext = "ADMINISTRATOR (All permissions)";
    }
    const e = new MessageEmbed()
      .setTitle(`Your permissions:`)
      .setDescription(permstext);
    message.channel.send(e);
  },
};
