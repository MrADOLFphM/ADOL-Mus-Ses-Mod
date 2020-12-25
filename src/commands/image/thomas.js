const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "thomas",
  category: "image",
  description: "Thomas a user LMAO!",
  run: async (client, message, args) => {
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Thomas().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "thomas.png");
    message.channel.send(attach);
  },
};
