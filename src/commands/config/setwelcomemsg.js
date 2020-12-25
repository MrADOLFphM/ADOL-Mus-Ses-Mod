const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "setwelcomemsg",
  category: "config",
  description: "Changes the welcome message.",
  aliases: ["swm"],
  usage: "setwelcomemsg",
  votersOnly: true,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You need `MANAGE_CHANNELS` permission to use this");

    const filter = (res) => res.author.id === message.author.id;
    message.channel.send(
      `Alright you can now send your welcome message. Available params are: {user.username}, {user}, {user.id}, {user.tag}, {server.name}, {server.members}. `
    );
    const turn = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 30000,
    });
    if (!turn.size) {
      client.updateConfig(message.guild, {
        welcomemsg:
          "Welcome {user.username} to {server}, hope you have a good time!",
      });
      message.channel.send("Time is up welcome message has been resetted");
    }
    const msg = turn.first().content;
    client.updateConfig(message.guild, { welcomemsg: msg });
    message.channel.send(`The welcome message is now ${msg}`);
  },
};
