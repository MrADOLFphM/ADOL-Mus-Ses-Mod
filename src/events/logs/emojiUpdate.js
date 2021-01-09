const logBed = require("../../utils/logBed");

module.exports = {
  name: "emojiUpdate",
  async execute(client, oldEm, newEm) {
    if (!oldEm.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldEm.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    let msg = "";

    if (oldEm.name !== newEm.name) {
      msg = `Emoji: **${oldEm.name}** was renamed to **${newEm.name}** (${newEm})`;
    }
    {
      msg = `Emoji: **${newEm.name}** was updated (${newEm})`;
    }

    const embed = logBed(client).setTitle("Emoji Updated").setDescription(msg);

    webhook.send(embed);
  },
};
