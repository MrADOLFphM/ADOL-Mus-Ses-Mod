const Discord = require("discord.js");
const morseCode = require("../../assets/js/morse");
module.exports = {
  name: "morse",
  description: "Morse code",
  category: "premium",
  premiumOnly: true,
  run: async (client, message, args) => {
    const morse = args
      .join(" ")
      .toLowerCase()
      .replace(/./g, (x) => `${morseCode[x]}\u2001`)
      .trim();
    if (morse.includes(undefined))
      return message.send("That language is not supported!");
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`\`${client.shorten(morse, 1024)}\``)
    );
  },
};
