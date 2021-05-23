const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "fakenews",
  description: "Fakenews alert!",
  category: "image",
  run: async (client, message, args) => {
    const av = client
      .findMember(message, args, true)
      .user.displayAvatarURL({ format: "png" });
    const img = await client.dankmemer.fakenews(av);
    message.send(new MessageAttachment(img, "fakenews.png"));
  },
};
