const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "stonks",
  category: "image",
  description: "stonk a user LMAO!",
  run: async (client, message, args) => {
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Stonk().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "stonk.png");
    message.channel.send(attach);
  },
};
