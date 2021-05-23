module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the currently playing song",
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

    client.player.skip(message);

    message.channel.send(
      `${client.emotes.success} - The current music has just been **skipped** !`
    );
  },
};
