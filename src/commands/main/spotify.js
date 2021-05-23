const moment = require("moment");
require("moment-duration-format");
const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "spotify",
  category: "utility",
  aliases: ["spot"],
  description: "Shows status of users",
  usage: "",
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (ro) =>
          ro.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    user.presence.activities.forEach((activity) => {
      if (
        activity.type === "LISTENING" &&
        activity.name === "Spotify" &&
        activity.assets !== null
      ) {
        const trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(
          8
        )}`;
        const trackURL = `https://open.spotify.com/track/${activity.syncID}`;
        const trackName = activity.details;
        const trackAuthor = activity.state.replace(/;/g, ",");
        const trackAlbum = activity.assets.largeText;

        const end = moment
          .duration(new Date(activity.timestamps.end) / 1000, "seconds")
          .format("d [Days] h [Hours] m [Minutes] s [Seconds]");
        const start = moment
          .duration(new Date(activity.timestamps.start) / 1000, "seconds")
          .format("d [Days] h [Hours] m [Minutes] s [Seconds]");

        const card = new canvacord.Spotify()
          .setAuthor(trackAuthor)
          .setAlbum(trackAlbum)
          .setStartTimestamp(start)
          .setEndTimestamp(end)
          .setImage(trackIMG)
          .setTitle(trackName);
        card.build().then((data) => {
          const attachment = new MessageAttachment(data, "Spotify.png");
          message.channel.send(attachment);
        });
      }
    });
  },
};
