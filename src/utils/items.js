const array = [
  {
    name: "Brownie",
    description: "Mmmmmm tastes so good. Don't eat too much or you'll be fat.",
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 10,
    price: 30,
    keep: false,
    run: async (client, message, args) => {
      const brownieRandom = [
        "You ate a brownie, and the taste of the chocolate watered in your mouth.",
        "You choked on a brownie and almost died. Be careful!",
        "The brownie tasted great.",
      ];
      const yes =
        brownieRandom[Math.floor(Math.random() * brownieRandom.length)];
      message.channel.send(`${yes}`);
    },
  },
  {
    name: "Wallet Lock",
    description: "Secure your wallet from those sneaky robbers",
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 2000,
    price: 5000,
    keep: true,
    run: async (client, message, args) => {},
  },

  {
    name: "Lucky Clover",
    description: "Increase your chances of successful robbery",
    canUse: false,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 4000,
    price: 15000,
    keep: false,
    run: async (client, message, args) => {},
  },
  {
    name: "Rice",
    description: "Eat rice because its best!",
    canUse: true,
    canBuy: true,
    displayOnShop: true,
    sellAmount: 20,
    price: 45,
    keep: false,
    run: async (client, message, args) => {
      let answers = [
        "You ate rice and gained 50 IQ",
        "You ate alot of rice and became an EPIC gamer",
        "You ate rice i suggest eating more",
        "You ate too much rice, stop it get some help",
      ];
      let randomAnswer = Math.floor(Math.random() * answers.length);
      message.channel.send(answers[randomAnswer]);
    },
  },
];

module.exports = array;
