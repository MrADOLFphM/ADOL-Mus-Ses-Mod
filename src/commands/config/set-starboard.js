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
      if (!onServer.length) return message.send("Theres no starboard channel!");
      await client.starboardManager.delete(onServer[0].channelID, "⭐");
      return message.send("Resetted the starboard channel!");
    }
    try {
      await client.starboardManager.create(channel, {
        selfStar: false,
        attachments: true,
        allowNsfw: false,
        color: {
          colors: ["#ffe26c", "#ffcc00", "#ff7c00", "#ff5500", "#ff0000"],
          max: 10,
        },
      });

      message.channel.send(`Starboard Channel is setted as ${channel}`); //send success message
    } catch (err) {
      message.reply("A starboard already exist's in that channel!");
    }
  },
};
