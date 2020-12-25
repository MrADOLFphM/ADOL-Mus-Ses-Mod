const Discord = require("discord.js");
module.exports = {
  name: "setmodlog",
  category: "config",
  usage: "setmodlog <#channel>",
  description: "Set the modlog channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let channel = client.findChannel(message, args, false);

    if (!channel) {
      await client.updateConfig(message.guild, { modlog: null });
      message.channel.send(
        "The modlog channel has been reset since no channel was provided"
      );
    }

    await client.updateConfig(message.guild, {
      modlog: channel.id,
    });
    message.channel.send(`The modlog Channel is setted as ${channel}`); //send success message
  },
};
