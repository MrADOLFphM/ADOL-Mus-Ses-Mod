module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
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

    if (!client.player.getQueue(message).paused)
      return message.channel.send(
        `${client.emotes.error} - The music is already playing !`
      );

    client.player.resume(message);

    message.channel.send(
      `${client.emotes.success} - Song ${
        client.player.getQueue(message).playing.title
      } **resumed** !`
    );
  },
};
