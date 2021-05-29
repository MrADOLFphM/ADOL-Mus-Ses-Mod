const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "links",
  aliases: ["vote", "invite"],
  category: "info",
  description: "All the links for andoi!",
  run: async (client, message, args) => {
    const sayEmbed = new MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dyanmic: true })
      )
      .addFields(
        {
          name: "Add Andoi",
          value: `[here](https://top.gg/bot/728694375739162685/invite)`,
          inline: true,
        },
        {
          name: "Andoi(s) top.gg Page",
          value: `[here](https://top.gg/bot/728694375739162685)`,
          inline: true,
        },
        {
          name: "Vote",
          value: `[here](https://top.gg/bot/728694375739162685/vote)`,
          inline: true,
        },
        {
          name: "Andoi Support",
          value: `[here](https://discord.gg/uvapYj5Wrf)`,
          inline: true,
        }
      )
      .setTimestamp()
      .setColor("RANDOM");

    message.channel.send(sayEmbed);
  },
};
