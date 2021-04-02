const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "pogramming",
  aliases: ["pquote"],
  description: "Random programming quote (i geuss).",
  category: "fun",
  run: async (client, message, args) => {
    const quote = await fetch(
      "https:/programming-quotes-api.herokuapp.com/quotes/random"
    ).then((r) => r.json());
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(quote.en)
      .setFooter(`By ${quote.author}`);
    message.send(embed);
  },
};
