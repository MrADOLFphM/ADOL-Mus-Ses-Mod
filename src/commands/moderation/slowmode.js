const ms = require("ms");
module.exports = {
  name: "slowmode",
  category: "utility",
  description: "Set the slowmode for the channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You do not have the right permissions for this!");
    if (!args[0])
      return message.reply("You did not specify the time! EG: 1m, 1s 4h");
    if (isNaN(ms(args[0])))
      return message.reply("That is not a valid time! EG: 1m, 1s 4h");
    message.channel.setRateLimitPerUser(ms(args[0]));
    message.send(`The slowmode now is ${args[0]}`);
  },
};
