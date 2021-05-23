const { MessageEmbed } = require("discord.js");
const ticketModel = require("../models/ticket");
module.exports = async (message, user, guildDoc) => {
  const ticketDoc = await ticketModel.findOne({
    guild: message.guild.id,
    owner: user.id,
  });
  if (ticketDoc) {
    message.channel.send(`${user} You already have a ticket!`);
  } else {
    const ticketChannel = await message.guild.channels.create(
      `ticket-${user.username}`,
      {
        permissionOverwrites: [
          {
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            id: user.id,
          },
          {
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            id: message.client.user.id,
          },
          {
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            id: message.guild.id,
          },
        ],
      }
    );
    const em = new MessageEmbed()
      .setTitle("Welcome to your ticket!")
      .setDescription(
        "Staff will assist you shortly. You can react with 🔒 to close this ticket!"
      );

    const msg = await ticketChannel.send(user.toString(), em);
    msg.react("🔒");
    const ticketDoc = new ticketModel({
      guild: message.guild.id,
      owner: user.id,
      channelID: ticketChannel.id,
      msg: msg.id,
    });
    ticketDoc.save();
  }
};
