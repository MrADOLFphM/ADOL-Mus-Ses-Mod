module.exports = (client) => {
  setInterval(async () => {
    if (client.ws.ping > 5000) {
      const channel = await client.channels.cache.get("803706448784785488");

      const msg = `${client.emotes.warn} The bots ping is currently very high expect lower response time (${client.ws.ping}ms)`;
      const sended = await channel.send(msg);
      sended.crosspost();
    }
  }, 30000);
};
