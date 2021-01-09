const logBed = require("../../utils/logBed");

module.exports = {
  name: "roleUpdate",
  async execute(client, oldRole, newRole) {
    if (!oldRole.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldRole.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    if (oldRole.name != newRole.name) {
      const embed = logBed(client)
        .setDescription(`**Role name of ${newRole} (${newRole.name}) changed**`)
        .setColor(15105570)
        .setFooter(`ID: ${newRole.id}`)
        .setAuthor(newRole.guild.name, newRole.guild.iconURL())
        .addField("Before:", oldRole.name)
        .addField("After:", newRole.name)
        .setTimestamp();
      webhook.send(embed);
    }
    // role colour change
    if (oldRole.color != newRole.color) {
      const embed = logBed(client)
        .setDescription(
          `**Role color of ${newRole} (${newRole.name}) changed**`
        )
        .setColor(15105570)
        .setFooter(`ID: ${newRole.id}`)
        .setAuthor(newRole.guild.name, newRole.guild.iconURL())
        .addField(
          "Before:",
          `${oldRole.color} ([${
            oldRole.hexColor
          }](https://www.color-hex.com/color/${oldRole.hexColor.slice(1)}))`
        )
        .addField(
          "After:",
          `${newRole.color} ([${
            newRole.hexColor
          }](https://www.color-hex.com/color/${newRole.hexColor.slice(1)}))`
        )
        .setTimestamp();
      webhook.send(embed);
    }
    if (oldRole.permissions != newRole.permissions) {
      const embed = logBed(client)
        .setDescription(
          `**Role permissions of ${newRole} (${newRole.name}) changed**\n[What those numbers mean](https://discordapp.com/developers/docs/topics/permissions)`
        )
        .setColor(15105570)
        .setFooter(`ID: ${newRole.id}`)
        .setAuthor(newRole.guild.name, newRole.guild.iconURL())
        .addField("Before:", oldRole.permissions.bitfield)
        .addField("After:", newRole.permissions.bitfield)
        .setTimestamp();
      webhook.send(embed);
    }
  },
};
