const logBed = require("../../utils/logBed");
module.exports = {
  name: "roleCreate",
  async execute(client, role) {
    if (!role.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await role.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    const embed = logBed(client)
      .setTitle("New role Created")
      .setDescription(`Role: **${role}** was created`);

    webhook.send(embed);
  },
};
