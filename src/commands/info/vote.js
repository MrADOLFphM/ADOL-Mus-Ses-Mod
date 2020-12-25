const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "vote",
  description: "vote for me!",
  category: "utility",
  usage: "vote",
  aliases: ["invite", "support"],
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("vote for me on discord boat list!")
      .setURL("https://discord.boats/bot/728694375739162685/vote")
      .setDescription(
        "[invite me!](https://discord.com/api/oauth2/authorize?client_id=728694375739162685&permissions=0&scope=bot)"
      )
      .addField(
        "Need support?",
        "[Support Server](https://discord.gg/jqm4Ybh)"
      );

    message.channel.send(embed);
  },
};
