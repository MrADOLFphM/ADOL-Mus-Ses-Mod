const guildModel = require("../../models/config");
const ticketModel = require("../../models/ticket");
const fetchAll = require("discord-fetch-all");
const hastebin = require("hastebin.js");
const haste = new hastebin({ url: hastebin.com });
const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "transcript",
  description: "get a transcript of a ticket!",
  cooldown: 3,
  category: "tickets",
  run: async (client, message, args) => {
    const ticketDoc = await ticketModel.findOne({ guild: message.guild.id });
    const guildDoc = await guildModel.findOne({ GuildID: message.guild.id });
    const e = message.member;
    const user = await message.guild.members.cache.get(e.id);

    if (
      user.id === ticketDoc.owner ||
      message.member.hasPermission("MANAGE_MESSAGES")
    ) {
      const channel = await message.guild.channels.cache.get(
        ticketDoc.channelID
      );
      if (message.channel.id !== channel.id)
        return message.channel.send(
          "Please only use this command in a ticket!"
        );
      const msgsArray = await fetchAll.messages(message.channel, {
        reverseArray: true,
      });
      const content = msgsArray.map(
        (m) =>
          `${m.author.tag} - ${
            m.embeds.length ? m.embeds[0].description : m.content
          }`
      );

      haste.post(content.join("\n"), "js").then((link) => message.reply(link));
    } else {
      message.channel.send("You don't have permissions to do this!");
    }
  },
};
