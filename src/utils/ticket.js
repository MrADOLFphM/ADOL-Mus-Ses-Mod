const { MessageEmbed } = require("discord.js");
const ticketModel = require("../models/ticket");
const configModel = require("../models/ticketcf");
module.exports = async (
  message,
  user,
  guildDoc,
  reason = "Created via panel"
) => {
  const ticketDoc = await ticketModel.findOne({
    guild: message.guild.id,
    owner: user.id,
  });
  if (ticketDoc) {
    message.channel
      .send(`${user} You already have a ticket!`)
      .then(async (msg) => {
        msg.delete({ timeout: 5000 });
      });
  } else {
    guildDoc.tickets += 1;
    await guildDoc.save();
    let ticketChannel;
    const conf = await configModel.findOne({
      guild: message.guild.id,
    });
    if (conf?.support) {
      ticketChannel = await message.guild.channels.create(
        `ticket-${user.username}`,
        {
          parent: conf?.cat,
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
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: conf.support,
            },
          ],
        }
      );
    } else {
      ticketChannel = await message.guild.channels.create(
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
    }
    ticketChannel.setTopic(`**Reason:** ${reason}`);
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
      reason: reason,
    });
    ticketDoc.save();
    message.channel.send(`Ticket created! ${ticketChannel}`);
  }
};
