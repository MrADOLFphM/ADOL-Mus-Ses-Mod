module.exports = {
  name: "nitro",
  description: "Use an emoji thats ment for nitro users",
  category: "premium",
  premiumOnly: true,
  run: async (client, message, args) => {
    message.delete();
    const ename = args[0];
    const emo = await client.emojis.cache.find((emo) => emo.name === ename);
    message.channel.send(`${emo}`);
  },
};
