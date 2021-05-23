module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Toggle music loop",
  category: "music",
  run: (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send(
        `${client.emotes.error} - You're not in a voice channel !`
      );

    if (!client.player.getQueue(message))
      return message.channel.send(
        `${client.emotes.error} - No music currently playing !`
      );

    if (client.player.getQueue(message).repeatMode) {
      client.player.setRepeatMode(message, false);
      return message.channel.send(
        `${client.emotes.success} - loop mode **disabled** !`
      );
    } else {
      client.player.setRepeatMode(message, true);
      return message.channel.send(
        `${client.emotes.success} - loop mode **enabled** !`
      );
    }
  },
};
