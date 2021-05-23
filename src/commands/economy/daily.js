const {
  addUserMoney,
  setUserDaily,
  getUserDaily,
} = require("../../utils/economy");

module.exports = {
  name: "daily",
  description: "daily",
  category: "economy",
  run: async (client, message) => {
    const user = message.author;
    const timeout = 86400000;
    const amount = 500;

    const daily = await getUserDaily(user.id);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      message.channel.send("You have already collected your daily!");
    } else {
      message.channel.send(`You collected your daily of **${amount}** coins`);
      addUserMoney(user.id, amount);
      setUserDaily(user.id, Date.now());
    }
  },
};
