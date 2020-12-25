const { MessageEmbed } = require("discord.js");
const { getSong } = require("genius-lyrics-api");
function Page(page, msg, title, info) {
  if (page == 0) {
    const embed = new MessageEmbed()
      .setTitle(title)
      .setURL(info.url)
      .setDescription(info.lyrics.substring(0, 2048))
      .setTimestamp();
    msg.edit(embed);
  } else {
    const num1 = page * 2048;
    const num2 = num1 + 2048;
    const embed = new MessageEmbed()
      .setTitle(title)
      .setURL(info.url)
      .setDescription(info.lyrics.substring(num1, num2))
      .setTimestamp();
    msg.edit(embed);
  }
}

module.exports = {
  name: "lyrics",
  category: "search",
  run: async (client, message, args) => {
    let options;
    // Check if a song is playing and use that song
    // Use the args for song search
    options = {
      apiKey: client.config.genius,
      title: args.join(" "),
      artist: "",
      optimizeQuery: true,
    };

    const wait = await message.channel.send("Searching for lyrics");
    // search for and send lyrics
    try {
      const info = await getSong(options);
      const embed = new MessageEmbed()
        .setTitle(options.title)
        .setURL(info.url)
        .setDescription(info.lyrics.substring(0, 2048))
        .setTimestamp()
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 1024,
          })
        );
      message.channel
        .send(embed)
        .then(async (msg) => {
          // If the song is less than 2048 no point adding reactions
          if (info.lyrics.length < 2048) return;

          // Check if bot has permission to connect to voice channel
          if (
            !message.channel
              .permissionsFor(message.guild.me)
              .has("ADD_REACTIONS")
          ) {
            return message.channel.send("I need add reactions permissions!");
          }

          // Check if bot has permission to delete emojis
          if (
            !message.channel
              .permissionsFor(message.guild.me)
              .has("MANAGE_MESSAGES")
          )
            return message.channel.send("i need manage messages permissions");

          // send reactions so user can see more lyrcis
          await msg.react("⬆");
          await msg.react("⬇");

          let page = 0;
          const filter = (reaction, user) => {
            return ["⬆", "⬇"].includes(reaction.emoji.name) && !user.bot;
          };
          const collector = msg.createReactionCollector(filter, {
            time: 240000,
          });
          collector.on("collect", (reaction) => {
            const totalpages = Math.round(info.lyrics.length / 2048);
            if (reaction.emoji.name === "⬆") {
              // back page
              page = page - 1;
              if (page <= 0) page = 0;
              Page(page, msg, options.title, info);
            } else {
              // forward page
              page = page + 1;
              if (page >= totalpages) page = totalpages;
              Page(page, msg, options.title, info);
            }
          });
        })
        .catch((e) => console.log(e));
      wait.delete();
    } catch (err) {
      wait.delete();
    }
  },
};
