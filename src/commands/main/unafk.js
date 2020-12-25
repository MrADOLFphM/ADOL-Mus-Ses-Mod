const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unafk",
  aliases: ["unafkme", "deleteafk"],
  category: "utility",
  description: "",
  run: async (client, message) => {
    if (!client.afk.has(message.author.id)) {
      return message.channel.send("You are not afk.");
    }
    let options = {
      justafk: false,
    };

    client.afk.delete(message.author.id, options);

    const embed = new MessageEmbed()
      .setDescription("You are not afk anymore")
      .setColor("BLUE");

    message.channel.send(embed);
    if (message.member.nickname) {
      if (message.member.nickname.includes("[AFK]")) {
        message.member.setNickname("");
      }
    } else {
      message.member.setNickname(`${message.author.username}`);
    }
  },
};
