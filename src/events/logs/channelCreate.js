const logBed = require("../../utils/logBed");

module.exports = {
  name: "channelCreate",
  async execute(client, channel) {
    if (channel.type === "dm") return;
    if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await channel.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    let msg = "";

    if (channel.type === "category") {
      msg = `Category: **${channel}** was created`;
    } else {
      msg = `Channel: **${channel}** was created`;
    }

    const embed = logBed(client)
      .setTitle("Channel Created")
      .setDescription(msg)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed);
  },
};
