const Discord = require("discord.js");
module.exports = {
  name: "setstarboard",
  category: "config",
  usage: "setstarboard <#channel>",
  description: "Set the starboard channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let channel = client.findChannel(message, args, false); //mentioned channel

    if (!channel) {
      //if channel is not mentioned
      await client.updateConfig(message.guild, { starboardchan: null });
      message.channel.send(
        "The starboard channel has been reset since no channel was provided"
      );
    }

    await client.updateConfig(message.guild, { starboardchan: channel.id });

    message.channel.send(`Starboard Channel is setted as ${channel}`); //send success message
  },
};
