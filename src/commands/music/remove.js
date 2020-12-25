module.exports = {
  name: "remove",
  description: "Remove song from the queue",
  category: "music",
  run: async (client, message, args) => {
    const song = args.join(" ");
    if (!song) return message.channel.send("What song you wanna remove?");
    if (!message.member.voice.channel)
      return message.channel.send("Are you even in a voice channel?");
    await client.player.remove(message, song);
  },
};
