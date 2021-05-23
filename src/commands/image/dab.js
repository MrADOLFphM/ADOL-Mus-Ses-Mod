const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "dab",
  description: "Dab!",
  category: "image",
  run: async (client, message, args) => {
    const av = client
      .findMember(message, args, true)
      .user.displayAvatarURL({ format: "png" });
    const img = await client.dankmemer.dab(av);
    message.send(new MessageAttachment(img, "dab.png"));
  },
};
