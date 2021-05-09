const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "jail",
  description: "Jail somoene!",
  category: "image",
  run: async (client, message, args) => {
    const av = client
      .findMember(message, args, true)
      .user.displayAvatarURL({ format: "png" });
    const lol = await message.send(
      `${client.emotes.loading} Creating image please wait....`
    );
    const img = await client.dankmemer.jail(av);
    message.send(new MessageAttachment(img, "jail.png"));
    lol.delete();
  },
};
