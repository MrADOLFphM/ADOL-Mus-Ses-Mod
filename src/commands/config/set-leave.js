const Discord = require("discord.js");
module.exports = {
  name: "setleave",
  category: "config",
  usage: "setleave <#channel>",
  description: "Set the leave channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let channel = client.findChannel(message, args, false); //mentioned channel

    if (!channel) {
      //if channel is not mentioned
      await client.updateConfig(message.guild, { leaveChannel: null });
      message.channel.send(
        "The leave channel has been reset since no channel was provided"
      );
    }

    await client.updateConfig(message.guild, { leaveChannel: channel.id });

    message.channel.send(`Leave Channel is setted as ${channel}`); //send success message
  },
};
