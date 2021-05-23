const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "imdb",
  description: "Get the information about series and movie",
  category: "utility",
  run: async (client, message, args) => {
    const search = args.join(" ");

    if (!args.length) {
      return message.channel.send(
        message.translate("NO_MOVIE_PROVIDED", "MAIN")
      );
    }

    try {
      const movie = await client.imdb.get({ name: search });
      const released = new Date(movie.released).toLocaleDateString();

      const embed = new MessageEmbed()
        .setTitle(movie.title)
        .setColor("BLUE")
        .setThumbnail(movie.poster)
        .setDescription(movie.plot)
        .addField(message.translate("RATINGS", "IMDB"), movie.rating, true)
        .addField(message.translate("COUNTRY", "IMDB"), movie.country, true)
        .addField(message.translate("GENRES", "IMDB"), movie.genres, true)
        .addField(message.translate("AWARDS", "IMDB"), movie.awards, true)
        .addField(message.translate("LANGUAGES", "IMDB"), movie.languages, true)
        .addField(message.translate("RELEASED", "IMDB"), released, true)
        .addField(message.translate("TYPE", "IMDB"), movie.type, true);

      message.channel.send({ embed });
    } catch (e) {
      return message.channel.send(`No movie was found with ${search}`);
    }
  },
};
