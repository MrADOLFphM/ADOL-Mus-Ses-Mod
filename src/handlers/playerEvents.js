const Discord = require("discord.js"),
  ms = require("ms");
module.exports = async (client, player) => {
  player

    // Send a message when a track starts
    .on("trackStart", (message, track) => {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Now playing ${track.title}`)
        .addField("Author:", track.author, true)
        .addField("Views:", client.utils.formatNumber(track.views), true)
        .addField("Duration:", ms(track.durationMS), true)
        .addField("Requested by:", track.requestedBy.tag, true)
        .setURL(track.url)
        .setThumbnail(track.thumbnail);

      message.channel.send(embed);
    })

    // Send a message when something is added to the queue
    .on("trackAdd", (message, queue, track) =>
      message.channel.send(`${track.title} has been added to the queue!`)
    )
    .on("playlistAdd", (message, queue, playlist) =>
      message.channel.send(
        `${playlist.title} has been added to the queue (${playlist.items.length} songs)!`
      )
    )

    // Send messages to format search results
    .on("searchResults", (message, query, tracks) => {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Here are your search results for ${query}!`)
        .setDescription(tracks.map((t, i) => `${i + 1}. ${t.title}`))
        .setFooter("Send the number of the song you want to play!");
      message.channel.send(embed);
    })
    .on("searchInvalidResponse", (message, query, tracks, content, collector) =>
      message.channel.send(
        `You must send a valid number between 1 and ${tracks.length}!`
      )
    )
    .on("searchCancel", (message, query, tracks) =>
      message.channel.send(
        "You did not provide a valid response... Please send the command again!"
      )
    )
    .on("noResults", (message, query) =>
      message.channel.send(`No results found on YouTube for ${query}!`)
    )

    // Send a message when the music is stopped
    .on("queueEnd", (message, queue) =>
      message.channel.send(
        "Music stopped as there is no more music in the queue!"
      )
    )
    .on("channelEmpty", (message, queue) =>
      message.channel.send(
        "Music stopped as there is no more members in the voice channel!"
      )
    )
    .on("botDisconnect", (message) =>
      message.channel.send(
        "Music stopped as I have been disconnected from the channel!"
      )
    )

    // Error handling
    .on("error", (error, message) => {
      switch (error) {
        case "NotPlaying":
          message.channel.send(
            "There is no music being played on this server!"
          );
          break;
        case "NotConnected":
          message.channel.send("You are not connected in any voice channel!");
          break;
        case "UnableToJoin":
          message.channel.send(
            "I am not able to join your voice channel, please check my permissions!"
          );
          break;
        default:
          message.channel.send(`Something went wrong... Error: ${error}`);
      }
    });
};
