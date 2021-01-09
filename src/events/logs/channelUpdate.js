const logBed = require("../../utils/logBed");
//its a line i forgot to remove dont mind it

module.exports = {
  name: "channelUpdate",
  async execute(client, oldChannel, channel) {
    if (!oldChannel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldChannel.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    if (oldChannel.name != channel.name) {
      const embed = logBed(client)
        .setDescription(
          `**${
            channel.type === "category" ? "Category" : "Channel"
          } name changed of ${channel.toString()}**`
        )
        .setColor(15105570)
        .setFooter(`ID: ${channel.id}`)
        .setAuthor(channel.guild.name, channel.guild.iconURL())
        .addFields(
          { name: "Old:", value: `${oldChannel.name}`, inline: true },
          { name: "New:", value: `${channel.name}`, inline: true }
        )
        .setTimestamp();
      // send message
      webhook.send(embed);
    }
    // channel topic (description) change
    if (oldChannel.topic != channel.topic) {
      const embed = logBed(client)
        .setDescription(
          `**${
            channel.type === "category" ? "Category" : "Channel"
          } topic changed of ${channel.toString()}**`
        )
        .setColor(15105570)
        .setFooter(`ID: ${channel.id}`)
        .setAuthor(channel.guild.name, channel.guild.iconURL())
        .addFields(
          {
            name: "Old:",
            value: `${oldChannel.topic ? oldChannel.topic : "*empty topic*"}`,
            inline: true,
          },
          {
            name: "New:",
            value: `${channel.topic ? channel.topic : "*empty topic*"}`,
            inline: true,
          }
        )
        .setTimestamp();
      // send message
      webhook.send(embed);
    }
  },
};
function getDifference(array1, array2) {
  return array1.filter((i) => {
    return array2.indexOf(i) < 0;
  });
}
