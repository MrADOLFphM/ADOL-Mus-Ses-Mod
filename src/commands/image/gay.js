const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "gay",
  category: "image",
  description: "Gay a user LMAO!",
  run: async (client, message, args) => {
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Gay().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "gay.png");
    message.channel.send(attach);
  },
};
