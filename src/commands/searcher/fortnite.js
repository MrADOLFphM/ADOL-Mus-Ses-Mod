const { MessageEmbed } = require("discord.js");
const Fortnite = require("fortnite");
module.exports = {
  name: "fortnite",
  description: "get info about a fortnite user",
  category: "search",
  run: async (client, message, args) => {
    const stats = new Fortnite(client.config.fortnite);

    // Check if platform and user was entered
    if (!["kbm", "gamepad", "touch"].includes(args[0]))
      return message.channel.send(
        "Incorrect format: supported game types: kbm, gamepad, touch"
      );
    if (!args[1])
      return message.channel
        .send(`Please provide a user!`)
        .then((m) => m.delete({ timeout: 5000 }));

    // Get platform and user
    const platform = args.shift();
    const username = args.join(" ");
    const r = await message.channel.send(
      `Retrieving Fortnite information on **${username}**.`
    );

    // Retrieve stats from database
    stats
      .user(username, platform)
      .then((data) => {
        const embed = new MessageEmbed()
          .setColor(0xffffff)
          .setTitle(`Stats for ${data.username}`)
          .setURL(data.url)
          .setDescription(
            `**Top placements**\n\n**Top 3's:** *${data.stats.lifetime.top_3}*\n**Top 5's:** *${data.stats.lifetime.top_5}*\n**Top 6's:** *${data.stats.lifetime.top_6}*\n**Top 12's:** *${data.stats.lifetime.top_12}*\n**Top 25's:** *${data.stats.lifetime.top_25}*`
          )
          .setThumbnail(
            "https://vignette.wikia.nocookie.net/fortnite/images/d/d8/Icon_Founders_Badge.png"
          )
          .addField(
            "Total Score:",
            data.stats.solo.score +
              data.stats.duo.score +
              data.stats.squad.score,
            true
          )
          .addField("Matches Played:", data.stats.lifetime.matches, true)
          .addField("Wins:", data.stats.lifetime.wins, true)
          .addField(
            "Win percentage:",
            `${(
              (data.stats.lifetime.wins / data.stats.lifetime.matches) *
              100
            ).toFixed(2)}%`,
            true
          )
          .addField("Kills:", data.stats.lifetime.kills, true)
          .addField("K/D Ratio:", data.stats.lifetime.kd, true);
        r.delete();
        message.channel.send(embed);
      })
      .catch((err) => {
        message.channel.send(err);
      });
  },
};
