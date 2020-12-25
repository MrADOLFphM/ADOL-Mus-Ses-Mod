const logBed = require("../utils/logBed");
module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    if (!message.author) return;
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author,
      image: message.attachments.first()
        ? message.attachments.first().proxyURL
        : null,
    });
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    if (message.author.id === client.user.id) return;
    if (!message.guild) return;
    if (!message) return;
    if(message.partial) await message.fetch()
    if (message.author === null) return;
    const w = await message.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    const embed = logBed(client)
      .setTitle("Message deleted")
      .setDescription(
        `Message: \`${message}\` was deleted in ${message.channel} by ${message.author.tag}`
      )
      .setTimestamp();

    webhook.send(embed);
  },
};
