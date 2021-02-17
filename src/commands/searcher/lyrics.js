const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const paginate = require("../../modules/paginate");
module.exports = {
  name: "lyrics",
  category: "search",
  description: "Find the lyrics of a song!",
  run: async (client, message, args) => {
    const query = args.join(" ") || "Dance with somebody";
    const data = await fetch(
      `https://some-random-api.ml/lyrics?title=${encodeURI(query)}`
    )
      .then((res) => res.json())
      .catch(() => null);
    if (!data || data.error)
      return message.reply(
        `${client.emotes.error} I couldn't find the lyrics for ${query}`
      );
    if (data.lyrics.length < 2000) {
      return message.send(
        new MessageEmbed()
          .setColor("GREY")
          .setDescription(data.lyrics)
          .setThumbnail(data.thumbnail.genius)
          .setFooter(`Lyrics provided by genuis!`)
          .setAuthor(`${data.title}\n${data.author}`, null, data.links.genius)
      );
    }
    const lyricsArr = data.lyrics.split("\n");
    const lyricsSub = [""];
    let n = 0;
    for (const line of lyricsArr) {
      if (lyricsSub[n].length + line.length < 2000) {
        lyricsSub[n] = lyricsSub[n] + line + "\n";
      } else {
        n++;
        lyricsSub.push(line);
      }
    }

    await paginate(
      message,
      lyricsSub.map((x, i) =>
        new MessageEmbed()
          .setColor("GREY")
          .setDescription(x)
          .setThumbnail(data.thumbnail.genuis)
          .setFooter(
            [`Page: ${i + 1} of ${lyricsSub.length}`].join(" \u2000•\u2000")
          )
          .setAuthor(
            `${data.title}\n${data.author}`,
            client.user.displayAvatarURL(),
            data.links.genius
          )
      )
    );
  },
};
