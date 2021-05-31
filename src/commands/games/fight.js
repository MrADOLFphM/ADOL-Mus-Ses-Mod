const fight = require("../../structures/games/fight");

module.exports = {
  name: "fight",
  description: "Fight someone.",
  category: "games",
  run: async (client, message, args) => {
    if (!client.findMember(message, args, false))
      return message.reply("Who are you gonna figth?");

    const x = new fight({
      client: client,
      message: message,
      acceptMessage: `Do you accept this challenge? ${client.findMember(
        message,
        args,
        false
      )}`,
      challenger: message.author,
      opponent: client.findMember(message, args, false).user,
      hitButtonText: "HIT",
      hitButtonColor: "red",
      healButtonText: "HEAL",
      healButtonColor: "green",
      cancelButtonText: "CANCEL",
      cancelButtonColor: "blurple",
    });
    x.start();
  },
};
