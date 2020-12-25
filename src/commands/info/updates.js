const { MessageEmbed } = require("discord.js");
const update = require("../../models/updates.js");
module.exports = {
  name: "updates",
  description: "Learn more about current and future updates.",
  category: "info",
  usage: "updates",
  run: async (client, message, args) => {
    message.channel.send("Being upgraded at the moment.");

    const updates = await updates
      .findOne({ name: "andoi" })
      .catch((err) => console.log(err));
  },
};
