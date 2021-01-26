const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  aliases: ["pong"],
  category: "info",
  usage: "ping",
  description: "Get the bot's ping!",
  run: async (client, message, args) => {
    message.channel.send("Testing ping...").then(async (m) => {
      let randomColor = "RED";
      let dataPing = Date.now();
      await message.guild.getConfig();
      let dataPingNow = Date.now();
      let dataRealPing = dataPingNow - dataPing;
      const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("🏓 Pong!")
        .setDescription(
          `Bot Evaluation Time - **${Math.round(
            (m.createdAt - message.createdAt) / client.ws.ping
          )}**ms \nBot Latency - **${Math.round(
            m.createdAt - message.createdAt
          )}**ms \nAPI Latency - **${Math.round(
            client.ws.ping
          )}**ms\nDatabase Latency - **${dataRealPing}**ms`
        )
        .setColor("RED");
      m.edit(embed);
    });
  },
};
