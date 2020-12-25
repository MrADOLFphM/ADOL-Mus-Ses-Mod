const {
  removeUserBank,
  getUserBank,
  addUserMoney,
} = require("../../utils/economy");

module.exports = {
  name: "withdraw",
  description: "Withdraw money to your bank",
  category: "economy",
  usage: "withdraw <all | amount>",
  run: async (client, message, args) => {
    const user = message.author;
    let amount = args[0];

    if (!amount) return message.reply("Please provide an amount to withdraw");

    const bank = await getUserBank(user.id);

    if (bank !== 0 && amount === "all") {
      addUserMoney(user.id, bank);
      removeUserBank(user.id, bank);
      return message.channel.send("Successfully Withdrew all your money!");
    }

    amount = Number(args[0]);

    if (typeof amount !== "number" || isNaN(amount))
      return message.reply("Please provide a valid amount to withdraw");

    if (bank < amount)
      return message.channel.send(
        "You don't have that much money in your bank!"
      );

    addUserMoney(user.id, amount);
    removeUserBank(user.id, amount);

    message.channel.send(`Successfully Withdrew **${amount} coins**`);
  },
};
