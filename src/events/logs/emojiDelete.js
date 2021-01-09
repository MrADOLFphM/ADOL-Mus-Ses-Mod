const logBed = require("../../utils/logBed");

module.exports = {
  name: "emojiDelete",
  async execute(client, emoji) {
    if (!emoji.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await emoji.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    const embed = logBed(client)
      .setTitle("Emoji Deleted")
      .setDescription(`Emoji: **${emoji}** was deleted`);

    webhook.send(embed);
  },
};
