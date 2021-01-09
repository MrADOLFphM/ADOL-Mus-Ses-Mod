const logBed = require("../../utils/logBed");
module.exports = {
  name: "guildBanRemove",
  async execute(client, guild, user) {
    if (!guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;

    const embed = logBed(client)
      .setTitle("User unbanned!")
      .setDescription(`${user.username} has been unbanned in ${guild.name}`);
    webhook.send(embed);
  },
};
