const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "clear amount of messages",
  category: "moderation",
  aliases: ["purge"],
  usage: "clear <amount>",
  run: async (client, message, args) => {
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(`i do not have permissions to do this`);

    const user = message.member;
    const amount = args[0];
    if (!user.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        `${client.cross} **You do not have permissions for this!**`
      );

    if (!amount) return message.channel.send("Please provide a number");
    if (isNaN(args[0]))
      return message.channel.send(
        `${client.cross}**Please Supply A Valid Amount To Delete Messages!**`
      );

    if (args[0] > 100)
      return message.channel.send(
        `${client.cross}**Please Supply A Number Less Than 100!**`
      );

    if (args[0] < 1)
      return message.channel.send(
        `${client.cross}**Please Supply A Number More Than 1!**`
      );
    message.channel.bulkDelete(Number(amount) + 1).then(() => {
      message.channel
        .send(`${client.check} Deleted ${args[0]} messages.`)
        .then((msg) => msg.delete({ timeout: 2000 }, true));
    });
    await client.emit(
      "modlog",
      message.guild,
      "No one",
      "purged-messages",
      "None",
      message.member.user
    );
  },
};
