const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "readqr",
  aliases: ["rqr", "read-qr"],
  category: "utility",
  description: "Reads an qr code!",
  requiredArgs: ["image"],
  run: async (client, message, args) => {
    const image = args.join(" ") || message.attachments.first();
    const body = await fetch(
      `http://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURIComponent(
        image
      )}`
    ).then((res) => res.json());
    if (body[0].symbol[0].data !== null) {
      const embd = new MessageEmbed().setDescription(body[0].symbol[0].data);
      message.send(embd);
    } else {
      return message.reply(
        "I couldn't read that qr image maybe its invalid? Or its not an image?"
      );
    }
  },
};
