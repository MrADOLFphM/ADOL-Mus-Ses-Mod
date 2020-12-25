const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "restart",
  description: "restart to trigger people",
  category: "owner",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    message.channel.startTyping();

    message.channel.send("Bot is restarting.....");

    message.channel.stopTyping();
    process.exit(1);
  },
};
