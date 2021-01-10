const { MessageEmbed } = require("discord.js");
const Blacklisted = require("../../models/blacklistmodel");

module.exports = {
  name: "blacklist",
  description: "Remove/add blacklist from a user",
  category: "owner",
  usage: "blacklist <option> <level> <user>",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const type = args[0];
    const member =
      message.mentions.users.first() ||
      client.users.cache.find((user) => user.id === args[1]) ||
      client.users.cache.find((user) => user.tag === args[1]);

    if (!type) {
      return message.channel.send("Please provide a type");
    }

    if (!member) {
      return message.channel.send("Please provide a member");
    }

    if (member.id === client.user.id) {
      return message.channel.send("The bot cannot be blacklisted");
    }

    const users = await Blacklisted.find();

    switch (type) {
      case "view": {
        const usr = users.find((u) => u.user === member.id);

        if (!usr) {
          return message.channel.send("User is not blacklisted");
        }

        const embed = new MessageEmbed().setTitle(
          `Blacklist status: ${member.username}`
        );

        return message.channel.send({ embed });
      }
      case "add": {
        const existing = users.filter((u) => u.user === member.id)[0];
        if (existing) {
          return message.channel.send("this user is already blacklisted");
        }

        const blUser = new Blacklisted({ user: member.id });

        await blUser.save();
        break;
      }
      case "remove": {
        if (users === null) {
          return message.channel.send("This user is not blacklisted!");
        }
        const exists = users.find((u) => u.user === member.id);
        if (!exists) {
          return message.channel.send("This user isnt blacklisted!!!");
        }

        await Blacklisted.findOneAndDelete({ user: member.id });
        break;
      }
      default: {
        return message.channel.send("This is not an option!");
      }
    }
    return message.channel.send("User succesfully blacklisted");
  },
};
