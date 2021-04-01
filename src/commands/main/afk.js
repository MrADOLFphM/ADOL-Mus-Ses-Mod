const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "afk",
  aliases: ["setafk"],
  category: "utility",
  description: "",
  run: async (client, message, args) => {
    try {
      const userId = message.author;
      const user = await client.getUser(userId);
      if (!user) {
        message.send(
          "You din't exist in my database therefore you need re-execute this command!"
        );
        return await client.createUser({ userID: message.author.id });
      }
      if (user?.afk?.is_afk) {
        await client.updateUser(message.author, {
          afk: { is_afk: false, reason: null },
        });

        const embed = new MessageEmbed()
          .setTitle("Succes")
          .setDescription("You are no longer afk!");

        return message.channel.send(embed);
      }

      const reason = args.join(" ") || "None";

      await client.updateUser(userId, {
        afk: { is_afk: true, reason: reason },
      });

      const embed = new MessageEmbed()
        .setTitle("Succes")
        .setDescription(`You are afk for ${reason}`);

      message.channel.send(embed);
    } catch (err) {
      console.log(err);
      return message.channel.send("An error has occured.");
    }
  },
};
