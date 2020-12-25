const { MessageEmbed } = require("discord.js");
function logBed(client) {
  const avatar = client.user.displayAvatarURL();
  return new MessageEmbed()
    .setFooter("Andoi logs")
    .setThumbnail(avatar)
    .setColor("#0000FF")
    .setTimestamp();
}
module.exports = logBed;
