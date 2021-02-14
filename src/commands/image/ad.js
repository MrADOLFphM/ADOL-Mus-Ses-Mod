const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "ad",
  category: "image",
  description: "Ad a user LMAO!",
  run: async (client, message, args) => {
    const lol = message.send(
      `${client.emotes.loading}Loading image please wait.....`
    );
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Ad().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "ad.png");
    lol.delete();
    message.channel.send(attach);
  },
};
