const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "magic",
  description: "Shows a picture of yourself",
  category: "image",
  run: async (client, message, args) => {
    const member = client.findMember(message, args, true);

    let intensity = args[1] || Math.floor(Math.random() * 10);
    if (member.user.id === message.author.id) {
      intensity = args[0];
    }

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=magik&intensity=${intensity}&image=${member.user.displayAvatarURL(
        {
          format: "png",
        }
      )}`
    ).then((res) => res.json());

    message.channel.send(data.message);
  },
};
