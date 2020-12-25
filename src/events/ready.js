const botModel = require("../models/bot");
module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`Hi, ${client.user.username} is now online!`);
    await botModel.findOneAndUpdate({ name: "Andoi", commandssincerestart: 0 });
    setInterval(() => {
      const statuses = [
        `a!help || ${client.guilds.cache.size} servers.`,
        `a!help || ${client.channels.cache.size} channels`,
        `a!help || ${client.users.cache.size} users`,
        `a!help || definitly not you xD`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "WATCHING" });
    }, 60000);

    const w = await client.guilds.cache
      .get("740295580886106233")
      .fetchWebhooks();
    const webhook = w.find((w) => w.name === "Dev logs");
    webhook.send("Im online");
  },
};
