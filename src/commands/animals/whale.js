const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "whale",
  description: "Shows a picture of a whale",
  category: "animal",
  run: async (client, message) => {
    const data = await fetch(
      "https://some-random-api.ml/img/whale"
    ).then((res) => res.json());

    const embed = new MessageEmbed()
      .setDescription(`[Click here if image failed to load](${data.link})`)
      .setImage(data.link);

    message.channel.send(embed);
  },
};
