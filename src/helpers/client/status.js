module.exports = (client) => {
  setInterval(() => {
    const members = client.utils.formatNumber(
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
    );
    const servers = client.utils.formatNumber(client.guilds.cache.size);
    const commands = client.utils.formatNumber(client.commands.size);
    const channels = client.utils.formatNumber(client.channels.cache.size);
    const statuses = [
      `a!help || ${client.utils.formatNumber(servers)} servers.`,
      `a!help || ${channels} channels`,
      `a!help || ${members} users`,
      `a!help || ${commands} commands`,
    ];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: "WATCHING" });
  }, 60000);
};
