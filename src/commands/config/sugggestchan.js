const Discord = require("discord.js");

module.exports = {
  name: "setsuggest",
  category: "config",
  usage: "setsuggest <#channel>",
  description: "Set the suggestion channel",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );

    let channel = client.findChannel(message, args, false); //mentioned channel

    if (!channel) {
      //if channel is not mentioned
      await client.updateConfig(message.guild, { suggestChan: null });
      message.channel.send(
        "The suggestion channel has been reset since no channel was provided"
      );
    }

    //Now we gonna use quick.db

    await client.updateConfig(message.guild, { suggestChan: channel.id });

    message.channel.send(`The suggestion channel is now ${channel.name}.`); //send success message
  },
};
