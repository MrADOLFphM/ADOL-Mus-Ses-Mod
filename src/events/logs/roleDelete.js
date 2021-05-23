const { MessageEmbed } = require("discord.js");
const logBed = require("../../utils/logBed");
module.exports = {
  name: "roleDelete",
  async execute(client, role) {
    if (!role.guild.me?.permissions.has("MANAGE_WEBHOOKS")) return;
    const w = await role.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    const embed = logBed(client)
      .setTitle("Role deleted")
      .setDescription(`Role: **${role.name}** was deleted`);

    webhook.send(embed);
  },
};
