const Discord = require("discord.js");
module.exports = {
  name: "setwelcome",
  category: "config",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let channel = client.findChannel(message, args, false);

    if (!channel) {
      await client.updateConfig(message.guild, { welcomeChannel: null });
      message.channel.send(
        "The welcome channel has been reset since no channel was provided"
      );
    }

    await client.updateConfig(message.guild, {
      welcomeChannel: channel.id,
    });
    message.channel.send(`Welcome Channel is setted as ${channel}`); //send success message
  },
};
