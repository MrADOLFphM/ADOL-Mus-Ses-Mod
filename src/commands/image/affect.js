const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "affect",
  category: "image",
  run: async (client, message, args) => {
    const lol = message.send(
      `${client.emotes.loading}Loading image please wait.....`
    );
    const user = client.findMember(message, args);

    if (!user) {
      const image2 = message.author.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.affect(image2);
      let attachment = new MessageAttachment(slap, "affect.png");
      lol.delete();
      return message.channel.send(attachment);
    }
    if (user) {
      const image1 = user.user.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.affect(image1);
      let attachment = new MessageAttachment(slap, "affect.png");
      lol.delete();
      return message.channel.send(attachment);
    }
  },
};
