const { MessageEmbed } = require("discord.js");
const economy = require("../../models/userEco");
module.exports = {
  name: "rich",
  description: "Richest people on the bot",
  category: "economy",
  run: async (client, message, args) => {
    let data = await economy.find().limit(6);
    data = data
      .filter(
        (x) =>
          client.users.cache.get(x.userID) &&
          client.users.cache.get(x.userID).bot != true
      )
      .slice(0, 6);
    if (data.length == 0)
      return message.channel.send("No rich people sadly :c");

    const emojis = [":first_place:", ":second_place:", ":third_place:"];
    data = data.map(
      (x, i) =>
        `${emojis[i] || "🔹"} **${x.money.toLocaleString()}** - ${
          client.users.cache.get(x.userID).tag || "Unkown#0000"
        }`
    );

    const embed = new MessageEmbed()
      .setAuthor(`Richest people on the whole bot!`)
      .setDescription(`${data.join("\n")}`)
      .setColor("RANDOM")
      .setFooter("wish I had that much money");
    message.channel.send(embed);
  },
};
