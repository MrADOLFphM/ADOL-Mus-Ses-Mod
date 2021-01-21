const warnModel = require("../../models/warn");

module.exports = {
  name: "resetwarns",
  description: "Reset warnings of mentioned person",
  category: "moderation",
  usage: "rwarns <@user>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "Yopu should have admin perms to use this command"
      );
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        "Please mention the person whose warning you want to reset"
      );
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("Bot are not allowed to have warnings");
    }

    if (message.author.id === user.id) {
      return message.channel.send("You are not allowed to reset your warnings");
    }

    const ee = await warnModel.findOne({
      GuildID: message.guild.id,
      UserID: user.id,
    });
    if (!ee) return message.channel.send("This user doesnt have warnings");
    if (ee) {
      user.send(
        `Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`
      );
      await message.channel.send(
        `Reseted all warnings of ${message.mentions.users.first().username}`
      );
      ee.deleteOne();
    }
    await client.emit(
      "modlog",
      message.guild,
      user.user.username,
      "reset-warns",
      "None",
      message.member.user
    );
  },
};
