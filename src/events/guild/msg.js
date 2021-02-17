module.exports = {
  name: "message",
  async execute(client, message) {
    await client.functions.afk(message);
    await client.functions.handleLevel(message);
  },
};
