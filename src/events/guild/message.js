module.exports = {
  name: "message",
  async execute(client, message) {
    await client.monitors.run(message);
  },
};
