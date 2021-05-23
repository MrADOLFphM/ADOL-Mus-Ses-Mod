const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojis",
  description: "Get the emojis from the current server!",
  category: "utility",
  run: (client, message) => {
    const nonAnimated = [];
    const animated = [];

    message.guild.emojis.cache.forEach((e) => {
      if (e.animated) animated.push(e.toString());
      else nonAnimated.push(e.toString());
    });
    const animatedE =
      animated.join(" ").length > 1024
        ? `${animated.join(" ").slice(1010)}...`
        : animated.join(" ");
    const nonAnimatedE =
      nonAnimated.join(" ").length > 1024
        ? `${nonAnimated.join(" ").slice(1010)}...`
        : nonAnimated.join(" ");

    const embed = new MessageEmbed()
      .addField("Animated:", animatedE ? animatedE : "None")
      .addField("Non Animated:", nonAnimatedE ? nonAnimatedE : "None")
      .setColor("BLUE")
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send(embed);
  },
};
