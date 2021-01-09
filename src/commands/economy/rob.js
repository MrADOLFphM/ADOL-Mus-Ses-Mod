const {
  getUserMoney,
  removeUserMoney,
  getUserInventory,
  setUserInventory,
  addUserMoney,
} = require("../../utils/economy");

module.exports = {
  name: "rob",
  description: "Rob up to 1000coins from somebody",
  category: "economy",
  run: async (client, message, args) => {
    const user = client.findMember(message, args, false);
    const random = Math.floor(Math.random() * 4) + 1;
    if (!user) {
      return message.channel.send("Please provide a user mention");
    }

    if (user.id === message.author.id) {
      return message.channel.send("You can't rob yourself!");
    }

    const userId = user.id;
    const mo = getUserMoney(message.author.id);

    const inv = await getUserInventory(message.guild.id, message.author.id);
    const invR = await getUserInventory(message.guild.id, userId);
    let usersMoney = await getUserMoney(userId);
    if (random === 3 && !inv.includes("Lucky Clover")) {
      message.channel.send(
        `You tried to rob **${member.user.tag}** but got caught and lost 250 coins! Better luck next time.`
      );
      removeUserMoney(message.author.id, 250);
    } else if (random !== 3) {
      if (usersMoney === null) usersMoney = 0;

      if (usersMoney < 1) {
        return message.channel.send(
          "User doesn't have any money, therefor you can't rob this user."
        );
      }
      if (mo < 250)
        return message.channel.send(
          "You need 250 coins to atleast rob someone!"
        );
      const amount = Math.round(Math.random() * usersMoney);
      if (invR.includes("Wallet Lock")) {
        message.channel.send(
          ":x: Failed this user has a wallet lock now you paid him 250 coins for a robery atempt"
        );
        addUserMoney(userId, 250);
        removeUserMoney(message.author.id, amount);
      } else if (!invR.includes("Wallet Lock")) {
        removeUserMoney(userId, amount);
        addUserMoney(message.author.id, amount);

        return message.channel.send(
          `Successfully robbed **${amount}coins** from **${user.user.tag}**`
        );
      }
    }
  },
};
