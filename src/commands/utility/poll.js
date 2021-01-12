const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "poll",
  category: "utility",
  description: "make a simple poll and is easy",
  usage: "poll <text>",
  run: async (client, message, args) => {
    const question = args.join(" ");

    if (!question) return message.reply("Please provide a poll");

    const embed = new MessageEmbed()
      .setTitle(question)
      .setDescription(`Poll created by ${message.author.tag}`)
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setTimestamp();

    const sendMessage = await message.channel.send(embed);

    message.delete(); //Added this to make it better.

    sendMessage.react("👍🏻");
    sendMessage.react("👎🏻");
    sendMessage.react("🤷🏻");
  },
};
