const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "setleavemsg",
  category: "config",
  description: "Changes the leave message.",
  aliases: ["swm"],
  usage: "setleavemsg <msg>",
  votersOnly: true,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You need `MANAGE_CHANNELS` permission to use this");

    const filter = (res) => res.author.id === message.author.id;
    message.channel.send(
      `Alright you can now send your leave msg available params are: {user.username}, {user}, {user.id}, {user.tag}, {server3.name}, {server.members}. `
    );
    const turn = await message.channel.awaitMessages(filter, {
      max: 1,
      time: 30000,
    });
    if (!turn.size) {
      client.updateConfig(message.guild, {
        leavemsg:
          "Bye {user.username} Hope you had a good time staying in {server.name}",
      });
      message.channel.send("Time is up leave message has been resetted");
    }
    const msg = turn.first().content;
    client.updateConfig(message.guild, { leavemsg: msg });
    const e = new MessageEmbed()
      .setTitle("Succes!")
      .setDescription(`The leave message is now ${msg}`);
    message.channel.send(e);
  },
};
