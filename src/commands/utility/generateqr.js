const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "generateqr",
  description: "Generates a qr code!",
  category: "utility",
  requiredArgs: ["text"],
  aliases: ["genqr"],
  run: (client, message, args) => {
    const text = args.join("+");
    message.send(
      new MessageEmbed().setImage(
        `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          text
        )}`
      )
    );
  },
};
