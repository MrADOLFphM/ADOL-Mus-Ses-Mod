const botModel = require("../../models/bot");
const autoCovid = require("../../helpers/autoCovid");
module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`Hi, ${client.user.username} is now online!`);
    const vot = await botModel.findOne({ name: "Andoi" });
    await botModel.findOneAndUpdate({ name: "Andoi", commandssincerestart: 0 });
    setInterval(() => {
      const statuses = [
        `a!help || ${client.utils.formatNumber(
          client.guilds.cache.size
        )} servers.`,
        `a!help || ${client.channels.cache.size} channels`,
        `a!help || ${client.users.cache.size} users`,
        `a!help || ${client.commands.size} commands`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "WATCHING" });
    }, 60000);
    console.log(
      `Loaded ${client.utils.formatNumber(client.commands.size)} commands`
    );

    const w = await client.guilds.cache
      .get("740295580886106233")
      .fetchWebhooks();
    const webhook = w.find((w) => w.name === "Dev logs");
    webhook.send("Im online");
    for (const guild of client.guilds.cache) {
      setInterval(async () => {
        await autoCovid(client, guild.id);
      }, 43200000);
      const chan = vot?.channel;
      const ms = vot?.lastMsg;
      if (!ms) return;
      if (!chan) return;
      try {
        const msg = await client.channels.cache.get(chan).messages.fetch(ms);
        msg.edit("restarted succesfully");
      } catch (err) {
        return;
      }
    }
  },
};
