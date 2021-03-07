const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "crab",
  description: "Crab rave with text!",
  category: "image",
  requiredArgs: ["text"],
  cooldown: 30,
  run: async (client, message, args) => {
    const text = args.join(", ");
    const mp = await client.dankmemer.crab(text);
    const attah = new MessageAttachment(mp, "crab.mp4");
    message.send(attah);
  },
};
