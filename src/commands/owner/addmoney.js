const { getUserMoney, addUserMoney } = require("../../utils/economy");

module.exports = {
  name: "addmoney",
  description: "Add money to a user",
  category: "owner",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const member =
      client.users.cache.get(args[0]) || message.mentions.users.first();
    const amount = args[1];

    if (!member) {
      return message.channel.send("Please provide a member");
    }

    if (user.bot) {
      return message.channel.send("That user is a bot");
    }

    if (!amount) {
      return message.channel.send("Please give an amount to give");
    }

    message.channel.send(`Added ${amount} money to ${user.username}`);
    await addUserMoney(user.id, amount);
  },
};
