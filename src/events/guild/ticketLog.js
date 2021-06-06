const guildModel = require("../../models/config");
const { MessageEmbed } = require("discord.js");
const fetchAll = require("discord-fetch-all");
const PasteClient = require("pastebin-api").default;
const config = require("../../../config.json");
const pclient = new PasteClient(config.paste);
module.exports = {
  name: "ticketLog",
  async execute(client, type, channel, id, guildD) {
    const user = client.users.cache.get(id);
    const guildDoc = await guildModel.findOne({
      GuildID: guildD,
    });
    if (!guildDoc?.log) return;
    const embed = new MessageEmbed()
      .setTitle("Ticket logs!")
      .setDescription(
        `The ticket ${channel.name} has been ${type} (Owner: ${user.tag})`
      )
      .setFooter("Ticket logs")
      .setTimestamp();
    if (type === "deleted") {
      const msgsArray = await fetchAll.messages(channel, {
        reverseArray: true,
      });
      const content = msgsArray.map(
        (m) =>
          `${m.author.tag} - ${
            m.embeds.length ? m.embeds[0].description : m.content
          }`
      );
      const url = await pclient.createPaste({
        code: content.join("\n"),
        expireDate: "1W",
        format: "javascript",
        name: "transcript.js",
        publicity: 1,
      });
      embed.addField("Transcript:", `${url} (this link exspires in 1 week)`);
    }
    client.channels.cache.get(guildDoc.log).send(embed);
  },
};
