const Discord = require("discord.js");

module.exports = {
  name: "setmute",
  category: "config",
  usage: "setMute <@role>",
  description: "Set the mute role",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let role = client.findRole(message, args, false); //mentioned channel

    if (!role) {
      //if channel is not mentioned
      await client.updateConfig(message.guild, { muteRole: null });
      message.channel.send(
        "The mute role has been reset since no role was provided"
      );
    }

    //Now we gonna use quick.db

    await client.updateConfig(message.guild, { muteRole: role.id || role });

    message.channel.send(`mute  Role is seted as ${role}`); //send success message
  },
};
