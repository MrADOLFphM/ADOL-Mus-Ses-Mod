const ms = require("ms");
module.exports = {
  name: "uptime",
  category: "utility",
  description: "check how long the bot has been online for",
  aliases: ["up"],
  usage: "uptime",
  run: (client, message, args) => {
    message.channel.send(
      `I have been online for: \`${ms(client.uptime, { long: true })}\``
    );
  },
};
