const logBed = require("../../utils/logBed");
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
    if (message.partial) await message.fetch();
    if (message.author === null) return;
    const w = await message.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    let embed = logBed(client);
    let msg = message.content;
    if (message.content.length === 0) return;
    if (message.embeds.length > 0) {
      if (message.embeds[0].image) embed.setThumbnail(message.embeds[0].image);
      if (message.embeds[0].description)
        embed.setDescription(message.embeds[0].description);
      if (message.embeds[0].title) embed.setTitle(message.embeds[0].title);
      embed.setFooter("Message deleted!");
    } else {
      embed

        .setDescription(
          `Message: \`${msg}\` was deleted in ${message.channel} by ${message.author.tag}`
        )
        .setFooter("Message deleted")
        .setTimestamp();
    }
    webhook.send(embed);
  },
};
