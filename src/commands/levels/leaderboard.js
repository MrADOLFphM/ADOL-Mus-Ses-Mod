const { MessageEmbed } = require("discord.js");
const Levels = require("../../modules/discord-xp");
module.exports = {
  name: "leaderboard",
  description: "leaderboard!",
  aliases: ["lb"],
  category: "levels",
  run: async (client, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

    if (rawLeaderboard.length < 1)
      return message.reply("Nobody's in leaderboard yet.");

    const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

    const lb = leaderboard.map(
      (e) =>
        `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
          e.level
        }\nXP: ${e.xp.toLocaleString()}`
    ); // We map the outputs.
    let embed = new MessageEmbed()
      .setTitle("Leaderboard")
      .setDescription(`\n\n${lb.join("\n\n")}`)
      .setThumbnail(message.guild.iconURL());
    message.channel.send(embed);
  },
};
