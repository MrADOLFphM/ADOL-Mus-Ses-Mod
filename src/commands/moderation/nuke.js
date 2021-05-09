module.exports = {
  name: "nuke",
  description: "Nuke the current channel, delete all messages of the channel",
  usage: "nuke",
  aliases: ["channelnuke"],
  category: "moderation",
  run: async (client, message) => {
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        `I dont have the correct permissions for this!`
      );

    const user = message.member;
    if (!user.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        "You don't have the correct permissions for that!"
      );
    const filter = (reaction, user) => user.id === message.author.id;
    const Arr = ["✅", "❌"];
    const e = await message.awaitReact(
      "Are you sure you wanna nuke this channel?",
      filter,
      Arr
    );
    if (e === "✅") {
      let channel = client.channels.cache.get(message.channel.id);
      const position = channel.position;
      const topic = channel.topic;

      const channel2 = await channel.clone();

      channel2.setPosition(position);
      channel2.setTopic(topic);
      channel.delete();
      channel2.send("Channel has been nuked! https://imgur.com/LIyGeCR");
      await client.emit(
        "modlog",
        message.guild,
        "No one",
        "nuke",
        "None",
        message.member.user
      );
    } else {
      return message.send("Cancelled!");
    }
  },
};
