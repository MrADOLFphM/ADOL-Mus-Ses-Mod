module.exports = {
  name: "nitro",
  description: "Use an emoji thats ment for nitro users",
  category: "premium",
  premiumOnly: true,
  run: async (client, message, args) => {
    message.delete();
    const ename = args[0];
    let emo =
      (await client.emojis.cache.find((emo) => emo.name === ename)) ||
      client.emotes.error;
    if (!emo) emo = client.emotes.error;
    message.channel.send(`${emo}`);
  },
};
