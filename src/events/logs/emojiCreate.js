const logBed = require("../../utils/logBed");

module.exports = {
  name: "emojiCreate",
  async execute(client, emoji) {
    if (!emoji.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await emoji.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    const embed = logBed(client)
      .setTitle("New Emoji Created")
      .setDescription(`Emoji: **${emoji}** was created`)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed);
  },
};
