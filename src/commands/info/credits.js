const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "credits",
  category: "info",
  run: (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Here we give credits to people who have helped us!")
      .addField(
        `CasperTheGhost`,
        "Casper has helped us fix alot of bugs and on the economy system"
      )
      .addField(`Darkfang46`, "Has given some commands src to us!");
    message.send(embed);
  },
};
