const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "triggered",
  category: "image",
  description: "trigger a user LMAO!",
  run: async (client, message, args) => {
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Triggered().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "trigger.gif");
    message.channel.send(attach);
  },
};
