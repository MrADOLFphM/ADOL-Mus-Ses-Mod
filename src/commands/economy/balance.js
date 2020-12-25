const { MessageEmbed } = require("discord.js");
const { getUserMoney, getUserBank } = require("../../utils/economy");

module.exports = {
  name: "balance",
  description: "balance",
  category: "economy",
  aliases: ["bal"],
  run: async (client, message) => {
    const user = message.mentions.users.first() || message.author;
    let money = await getUserMoney(user.id);
    let bank = await getUserBank(user.id);

    if (money === null) money = 0;
    if (bank === null) bank = 0;

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Balance`)
      .setColor("BLUE")
      .addField("Pocket:", money)
      .addField("Bank", bank);

    message.channel.send(embed);
  },
};
