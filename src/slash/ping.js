const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Check my ping",
  async execute(client, interaction, args) {
    let dataPing = Date.now();
    await interaction.guild.getConfig();
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
    interaction.reply(embed);
  },
};
