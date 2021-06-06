const createTicket = require("../../utils/ticket");
const guildModel = require("../../models/config");
const { MessageEmbed } = require("discord.js");
const fetchAll = require("discord-fetch-all");
const ticketModel = require("../../models/ticket");
const PasteClient = require("pastebin-api").default;
const config = require("../../../config.json");
const pclient = new PasteClient(config.paste);
module.exports = {
  name: "messageReactionAdd",
  async execute(client, reaction, user) {
    const { message } = reaction;
    if (user.bot) return;
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    const guildDoc = await guildModel.findOne({
      GuildID: reaction.message.guild.id,
    });
    const ticketDoc = await ticketModel.findOne({
      guild: reaction.message.guild.id,
      channelID: message.channel.id,
    });

    if (reaction.message.id === guildDoc?.msg) {
      reaction.users.remove(user);
      createTicket(message, user, guildDoc);
    }

    if (
      reaction.message.id === ticketDoc?.msg &&
      reaction.emoji.name === "🔒"
    ) {
      reaction.users.remove(user);
      message.channel.updateOverwrite(client.users.cache.get(ticketDoc.owner), {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
      });
      await client.emit(
        "ticketLog",
        "closed",
        message.channel,
        ticketDoc.owner,
        message.guild.id
      );
      const msg = await message.channel.send({
        embed: {
          color: "RED",
          description: "🔓 Reopen Ticket \n⛔ Close Ticket \n📰 Transcript!",
          footer: "Ticket Bot | made by syd's cloud",
        },
      });
      await msg.react("🔓");
      await msg.react("⛔");
      await msg.react("📰");
      ticketDoc.msg = msg.id;
      ticketDoc.status = false;

      await ticketDoc.save();
    } else if (
      reaction.message.id === ticketDoc?.msg &&
      reaction.emoji.name === "🔓"
    ) {
      message.channel.updateOverwrite(client.users.cache.get(ticketDoc.owner), {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,
      });
      await client.emit(
        "ticketLog",
        "re-opened",
        message.channel,
        ticketDoc.owner,
        message.guild.id
      );

      const msg = await message.channel.messages.fetch(ticketDoc.msg);

      msg.delete();
      const e = new MessageEmbed().setDescription(
        "Staff re-opened this ticket. You can react with 🔒 to close this ticket again!"
      );
      const owner = await message.guild.members.cache.get(ticketDoc.owner);
      const msg3 = await message.channel.send(e);
      ticketDoc.msg = msg3.id;
      ticketDoc.ticketStatus = true;

      await ticketDoc.save();
      await msg3.react("🔒");

      message.channel.send({
        embed: {
          color: "GREEN",
          description: `Ticket opened by ${user}`,
        },
      });
    } else if (
      reaction.message.id === ticketDoc?.msg &&
      reaction.emoji.name == "⛔"
    ) {
      await client.emit(
        "ticketLog",
        "deleted",
        message.channel,
        ticketDoc.owner,
        message.guild.id
      );

      setTimeout(async () => {
        message.channel.delete();
        await ticketDoc.deleteOne();
      }, 5 * 1000);
    } else if (
      reaction.message.id === ticketDoc?.msg &&
      reaction.emoji.name == "📰"
    ) {
      const msgsArray = await fetchAll.messages(message.channel, {
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
      message.channel.send("Your transcript: " + url);
    }
  },
};
