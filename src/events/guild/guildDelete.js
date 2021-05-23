const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildDelete",
  async execute(client, guild) {
    const w = await client.guilds.cache
      .get("740295580886106233")
      .fetchWebhooks();
    const webhook = w.find((w) => w.name === "Guild log");
    if (!webhook) return;
    const logBed = new MessageEmbed().setTitle(
      `i have been removed from ${guild}`
    );
    webhook.send(logBed);
    await client.deleteConfig(guild);
  },
};
