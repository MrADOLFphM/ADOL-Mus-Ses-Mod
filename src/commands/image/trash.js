const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "trash",
  category: "image",
  description: "Trash a user LMAO!",
  run: async (client, message, args) => {
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Trash().getImage(avatar, 5);

    let attach = new Discord.MessageAttachment(img, "trash.png");
    message.channel.send(attach);
  },
};
