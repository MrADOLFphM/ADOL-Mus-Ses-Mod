const Discord = require("discord.js");
module.exports = {
  name: "setstarcount",
  category: "config",
  usage: "setstarcount <#number>",
  description: "Set the stars required for the message to appear in the starboard channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let channel = args[0] //mentioned channel
    
    if (!channel) {
      //if channel is not mentioned
      await client.updateConfig(message.guild, { starboardnum: 3 });
      message.channel.send(
        "The star count has been reset since no number was provided"
      );
    }
    const e = parseInt(channel)
    if(!e) return message.channel.send('Thats not a number!')
    await client.updateConfig(message.guild, { starboardnum: e });

    message.channel.send(`Star Number is setted as ${channel}`); //send success message
  },
};