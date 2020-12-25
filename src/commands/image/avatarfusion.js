const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");

module.exports = {
  name: "avatarfusion",
  aliases: ["avatarfuse", "fuseavatar"],
  category: "image",
  usage:
    "[first mention | first username | first ID | first nickname] <second mention | second username | second ID | second nickname>",
  description: "Draws A User's Avatar Over Other User's Avatar",
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("ATTACH_FILES"))
      return message.channel.send("**Missing Permissions - [ATTACH_FILES]!**");
    let base = message.member;
    let overlay = client.findMember(message, args, false);
    if (!overlay) return message.channel.send("**Overlay User Not Found!**");
    const baseAvatarURL = base.user.displayAvatarURL({
      format: "png",
      size: 512,
    });
    const overlayAvatarURL = overlay.user.displayAvatarURL({
      format: "png",
      size: 512,
    });
    try {
      const baseAvatarData = await request.get(baseAvatarURL);
      const baseAvatar = await loadImage(baseAvatarData.body);
      const overlayAvatarData = await request.get(overlayAvatarURL);
      const overlayAvatar = await loadImage(overlayAvatarData.body);
      const canvas = createCanvas(baseAvatar.width, baseAvatar.height);
      const ctx = canvas.getContext("2d");
      ctx.globalAlpha = 0.5;
      ctx.drawImage(baseAvatar, 0, 0);
      ctx.drawImage(overlayAvatar, 0, 0, baseAvatar.width, baseAvatar.height);
      return message.channel.send({
        files: [{ attachment: canvas.toBuffer(), name: "avatarfusion.png" }],
      });
    } catch (err) {
      return message.channel.send(
        `Oh no, an error occurred: \`${err.message}\`. Try again later!`
      );
    }
  },
};
