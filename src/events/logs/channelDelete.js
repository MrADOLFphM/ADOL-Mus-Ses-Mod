const logBed = require("../../utils/logBed");

module.exports = {
  name: "channelDelete",
  async execute(client, channel) {
    if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await channel.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    let msg = "";
    if (channel.type === "category") {
      msg = `Category: **${channel.name}** was deleted`;
    } else {
      msg = `Channel: **${channel.name}** was deleted`;
    }

    const embed = logBed(client)
      .setTitle("Channel deleted")
      .setDescription(msg)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed);
  },
};
