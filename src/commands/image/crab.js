const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "crab",
  description: "Crab rave with text!",
  category: "image",
  requiredArgs: ["text"],
  cooldown: 30,
  run: async (client, message, args) => {
    if (!args.length || args.length < 2)
      return message.reply("You need to include atleast 2 words!");
    const text = args.join(", ");

    const lmao = await message.send(
      `${client.emotes.loading} Getting video please wait...`
    );
    const mp = await client.dankmemer.crab(text);
    const attah = new MessageAttachment(mp, "crab.mp4");
    lmao.delete();
    message.send(attah);
  },
};
