const { MessageEmbed } = require("discord.js");
const chroma = require("chroma-js");
module.exports = {
  name: "color",
  description: "Color.",
  category: "utility",
  run: (client, message, args) => {
    const color = chroma(args[0]);
    const preview = `https://api.no-api-key.com/api/v2/color?hex=${
      color.hex().split("#")[1]
    }`;
    const embed = new MessageEmbed()
      .setThumbnail(preview)
      .setTimestamp()
      .addField("Hex", color.hex())
      .addField("Rgb", `rgb(${color.rgb().join(", ")})`)
      .addField("Rgba", `rgba(${color.rgba().join(", ")})`)
      .setFooter(message.author.username)
      .setColor(color.num())
      .setTitle(color);

    message.channel.send(embed);
  },
};
