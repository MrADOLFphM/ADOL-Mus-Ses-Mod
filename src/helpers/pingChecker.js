module.exports = (client) => {
  setInterval(async () => {
    if (client.ws.ping > 5000) {
      const channel = await client.channels.cache.get("804757935803990026");

      const msg = `${client.emotes.warn} The bots ping is currently very high expect lower response time (${client.ws.ping}ms)`;
      channel.send(msg);
    }
  }, 30000);
};
