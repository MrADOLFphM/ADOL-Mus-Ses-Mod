const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "bed",
  category: "image",
  run: async (client, message, args) => {
    const user = client.findMember(message, args);

    if (!user) {
      const image1 = client.user.displayAvatarURL({ format: "png" });
      const image2 = message.author.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.bed(image1, image2);
      let attachment = new MessageAttachment(slap, "bed.png");
      return message.channel.send(attachment);
    }
    if (user) {
      const image1 = message.author.displayAvatarURL({ format: "png" });
      const image2 = user.user.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.bed(image1, image2);
      let attachment = new MessageAttachment(slap, "bed.png");
      return message.channel.send(attachment);
    }
  },
};
