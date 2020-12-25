const Levels = require("../../modules/xp");
const Discord = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "rank",
  description: "get your level!",
  aliases: ["level", "r"],
  category: "levels",
  run: async (client, message, args) => {
    const target = message.mentions.users.first() || message.author; // Grab the target.

    const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.

    if (!user)
      return message.channel.send(
        "Seems like this user has not earned any xp so far."
      );
    const req = Levels.xpFor(user.level + 1);
    const level = user.level;
    const rank = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({ format: "png" }))
      .setCurrentXP(user.xp)
      .setRequiredXP(req)
      .setRank(0, "ha", false)
      .setStatus(target.presence.status)
      .setLevel(level)
      .setBackground("IMAGE", "https://wallpapercave.com/wp/wp2563380.jpg")
      .setUsername(target.username)
      .setDiscriminator(target.discriminator)
      .setProgressBar("#FFFFFF", "COLOR");

    rank.build().then((data) => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      message.channel.send(attachment);
    });
  },
};
