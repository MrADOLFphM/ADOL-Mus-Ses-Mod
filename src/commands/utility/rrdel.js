const ReactionsModel = require("../../models/reactionrole");

module.exports = {
  name: "rrremove",
  description: "Add a reaction role",
  category: "reactions",
  usage: "rradd <channel_id> <message_id> <emoji>",
  aliases: ["rrdel", "rrr", "rrdelete"],
  run: async (bot, message, args) => {
    const [messageId] = args;

    if (!messageId) {
      return message.channel.send("You dint provide a message id!");
    }

    const reaction = await ReactionsModel.findOne({
      guild_id: message.guild.id,
      message_id: messageId,
    });

    if (!reaction) {
      return message.channel.send("Please provide a valid message id");
    }

    const channel = message.guild.channels.cache.get(reaction.channel_id);
    const msg = channel.messages.cache.get(messageId);
    if (!msg)
      return message.channel.send("I did not find a message with that id!");

    msg.delete();
    await ReactionsModel.findOneAndDelete({ message_id: messageId });

    return message.channel.send("Succesfully removed the reaction!");
  },
};
