const { MessageEmbed } = require("discord.js");
const itemss = require("../../utils/items");

module.exports = {
  name: "andoishop",
  category: "economy",
  run: async (client, message, args) => {
    if (!args.join(" ") || !isNaN(args.join(" "))) {
      let amount = 5 * parseInt(args[0]);
      let page;
      if (!args[0]) {
        amount = 5;
      }
      let items = client.items.list().filter((x) => x.canBuy === true);
      items = items.slice(amount - 5, amount);
      items = items.map(
        (x) =>
          `**${x.name}** -- __${x.price.toLocaleString()} coins__\n${
            x.description
          }`
      );
      if (itemss.length <= 5) page = 1;
      else if (itemss.length <= 10) page = 2;
      else if (itemss.length <= 15) page = 3;
      else if (itemss.length <= 20) page = 4;
      const shopEmbed = new MessageEmbed()
        .setTitle("Andoi Shop")
        .setDescription(`${items.join("\n\n")}`)
        .setColor("RANDOM")
        .setFooter(`Page ${args[0] || 1} of ${page}`);
      message.channel.send(shopEmbed);
    } else {
      const item = itemss.find(
        (x) => x.name.toLowerCase() === args.join(" ").toString().toLowerCase()
      );
      if (!item) {
        return message.channel.send(
          "Can't send an item that doesn't exist lmao"
        );
      }
      let e;
      if (!item.canBuy) e = "Can't buy this item.";
      else {
        e = `**${item.price.toLocaleString()}** coins`;
      }
      const embed = new MessageEmbed()
        .setTitle(item.name)
        .setDescription(
          `${
            item.description
          }\n\n**Price**: ${e}\n**Sell Amount**: **${item.sellAmount.toLocaleString()}** coins`
        )
        .setColor("RANDOM");
      message.channel.send(embed);
    }
  },
};
