const {
  getUserMoney,
  addUserBank,
  removeUserMoney,
} = require("../../utils/economy");

module.exports = {
  name: "deposit",
  description: "deposit money to your bank",
  category: "economy",
  usage: "!deposit <all | amount>",
  run: async (client, message, args) => {
    const user = message.author;
    let amount = args[0];

    if (!amount) return message.reply("Please provide an amount to deposit");

    const money = await getUserMoney(user.id);

    if (money !== 0 && amount === "all") {
      addUserBank(user.id, money);
      removeUserMoney(user.id, money);
      return message.channel.send("Successfully deposited all your money!");
    }

    amount = Number(args[0]);

    if (typeof amount !== "number" || isNaN(amount))
      return message.reply("Please provide a valid amount to deposit");

    if (money < amount)
      return message.channel.send("You don't have that much money!");

    addUserBank(user.id, amount);
    removeUserMoney(user.id, amount);

    message.channel.send(`Successfully deposited **${amount} coins**`);
  },
};
