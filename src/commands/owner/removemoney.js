const { removeUserMoney } = require("../../utils/economy");

module.exports = {
  name: "removemoney",
  description: "Remove money from a user",
  category: "owner",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const member = client.users.cache.get(args[0]);
    const amount = args[1];

    if (!member) {
      return message.channel.send("Please provide a member");
    }

    if (user.bot) {
      return message.channel.send("That user is a bot");
    }

    if (!amount) {
      return message.channel.send("Please give an amount to remove");
    }

    message.channel.send(`Removed ${amount} money from ${user.username}`);
    await removeUserMoney(user.id, amount);
  },
};
