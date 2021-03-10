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
      let onServer = await client.starboardManager.starboards.filter(
        (s) => s.guildID === message.guild.id
      );
      await client.starboardManager.starboards.delete(onServer[0].channelID);
      return message.send("Resetted the starboard channel!");
    }

    await client.starboardManager.create(channel, {
      selfStar: false,
      attachments: true,
      allowNsfw: false,
    });

    message.channel.send(`Starboard Channel is setted as ${channel}`); //send success message
  },
};
