const logBed = require("../../utils/logBed");
module.exports = {
  name: "messageUpdate",
  async execute(client, oldMsg, newMsg) {
    if (!newMsg.guild) return;
    if (!newMsg.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldMsg.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;

    // not enabled
    if (!newMsg.author) return;

    if (newMsg.author.id === client.user.id) return;
    if (newMsg.content === oldMsg.content) return;

    const embed = logBed(client)
      .setTitle(`Message updated in **${newMsg.channel.name}**`)
      .setDescription(`Message send by **${newMsg.author.tag}** was edited`)
      .addField("**Old Message**", oldMsg)
      .addField("**New Message**", newMsg);
    webhook.send(embed);
  },
};
