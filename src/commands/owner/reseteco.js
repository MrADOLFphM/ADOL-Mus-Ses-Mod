const user = require("../../models/userEco");
module.exports = {
  name: "reseteco",
  description: "Add money to a user",
  category: "owner",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const m = await user.find();
    m.forEach((m) => {
      m.deleteOne();
    });
    message.channel.send("Ok done!");
  },
};
