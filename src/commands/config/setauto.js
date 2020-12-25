const Discord = require("discord.js");

module.exports = {
  name: "setautorole",
  category: "config",
  usage: "setautor <@role>",
  description: "Set the role people get uppon joining",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let role = client.findRole(message, args, false); //mentioned channel

    if (!role) {
      //if channel is not mentioned
      await client.updateConfig(message.guild, { autoRole: null });
      message.channel.send(
        "The auto role has been reset since no role was provided"
      );
    }

    //Now we gonna use quick.db

    await client.updateConfig(message.guild, { autoRole: role.id || role });

    message.channel.send(`Auto Role is setted as "${role}"`); //send success message
  },
};
