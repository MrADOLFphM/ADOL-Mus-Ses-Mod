const { MessageEmbed } = require("discord.js");
const botModel = require("../../models/bot");
module.exports = {
  name: "restart",
  description: "restart to trigger people",
  category: "owner",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const filter = (reaction, user) => user.id === message.author.id;
    const Arr = ["✅", "❌"];
    const e = await message.awaitReact(
      "Are you sure you wanna restart the bot?",
      filter,
      Arr
    );
    if (e === "✅") {
      const ms = await message.send("Restarting bot...");
      await botModel.findOneAndUpdate({
        name: "Andoi",
        channel: message.channel.id,
        lastMsg: ms.id,
      });
      message.succes();
      process.exit(1);
    } else {
      message.send("Cancelled!");
      message.error();
    }
  },
};
