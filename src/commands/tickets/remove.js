const ticketModel = require("../../models/ticket");
module.exports = {
  name: "remove",
  description: "Remove an user from the ticket!",
  cooldown: 3,
  category: "tickets",
  run: async (client, message, args) => {
    const guild = message.guild;
    let member = guild.member(
      message.mentions.users.first() || guild.members.cache.get(args[0])
    );

    const ticketDoc = await ticketModel.findOne({
      guild: message.guild.id,
      channelId: message.channel.id,
    });

    if (!ticketDoc) return message.channel.send("This channel isnt a ticket!");
    try {
      if (ticketDoc || message.member.hasPermission("MANAGE_CHANNELS")) {
        message.channel.updateOverwrite(member.user, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false,
          READ_MESSAGE_HISTORY: false,
        });
      }
    } catch (err) {
      message.channel.send(
        "A unexpected error has ocured Please contact the developer!"
      );
      console.log(err);
    }
  },
};
