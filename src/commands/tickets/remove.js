const ticketModel = require("../../models/ticket");
const configModel = require("../../models/ticketcf");
module.exports = {
  name: "remove",
  description: "Remove an user from the ticket!",
  cooldown: 3,
  category: "tickets",
  run: async (client, message, args) => {
    const modd = await configModel.findOne({ guild: message.guild.id });
    if (!modd) return message.send("The ticket system is not setup!");
    const guild = message.guild;
    let member = guild.members.cache.get(
      message.mentions.users.first() || guild.members.cache.get(args[0])
    );
    if (!member) return message.reply("Who do you wanna remove?");

    const ticketDoc = await ticketModel.findOne({
      guild: message.guild.id,
      channelId: message.channel.id,
    });

    if (!ticketDoc) return message.channel.send(`This channel isnt a ticket!`);
    try {
      message.channel.updateOverwrite(member.user, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false,
      });
    } catch (err) {
      message.channel.send(
        "A unexpected error has ocured Please contact the developer!"
      );
      console.log(err);
    }
  },
};
