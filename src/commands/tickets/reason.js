const ticketModel = require("../../models/ticket");
const configModel = require("../../models/ticketcf");
module.exports = {
  name: "reason",
  description: "Change the topic of the ticket!",
  category: "tickets",
  run: async (client, message, args) => {
    const modd = await configModel.findOne({ guild: message.guild.id });
    if (!modd) return message.send("The ticket system is not setup!");
    const model = await ticketModel.findOne({
      guild: message.guild.id,
      channelID: message.channel.id,
    });
    if (!model) return message.reply("This is not an ticket.");
    const reason = args.join(" ");
    if (!reason) return message.reply("You forgot to give an reason!");

    await model.updateOne({ reason: reason });
    await message.channel.setTopic(`**Reason:** ${reason}`);
    message.channel.send("Changed the ticket topic!");
  },
};
