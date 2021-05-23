module.exports = {
  name: "message",
  async execute(client, message) {
    if (message.channel.type === "dm") return;
    await client.functions.afk(message);
    await client.functions.handleLevel(message);
  },
};
