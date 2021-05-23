const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "changemymind",
  category: "image",
  description: "tell someone to change your mind",
  usage: "changemymind <text>",
  run: async (client, message, args) => {
    const text = args.join(" ");

    if (!text) return message.channel.send("Please provide text");

    const sendMsg = await message.channel.send("⚙ Processing Image..");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then((res) => res.json());

    sendMsg.delete();
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](${data.message})`
      )
      .setImage(data.message)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
