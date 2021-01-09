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
    const data = await client.getUser(user);
    if (money === null) money = 0;
    if (bank === null) bank = 0;

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Balance`)
      .setColor("BLUE")
      .setDescription(
        `💳**Wallet**: ${money}\n🏦**Bank**: ${bank}/${
          data.bankSpace
        }\n🌐**Total Net Worth**: ${money + bank}`
      );

    message.channel.send(embed);
  },
};
