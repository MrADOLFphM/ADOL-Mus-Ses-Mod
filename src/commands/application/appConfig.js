const app = require("../../models/application/application.js");
module.exports = {
  name: "appConfig",
  aliases: ["appc", "appconfig", "appcof"],
  description: "Change config of the application system",
  category: "application",
  memberPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let guiild = await app.findOne({ guildID: message.guild.id });
    if (!guiild) {
      guiild = new app({ guildID: message.guild.id });
    }
    const filter = (res) => res.author.id === message.author.id;
    const option = args[0];

    if (!option)
      return message.channel.send(
        "Invalid option! Available options: `logs, enable, disable, acceptedrole`."
      );
    switch (option) {
      case "logs":
        let channel;
        if (args[1]) channel = args[1];
        if (!args[1])
          channel = await message.awaitReply(
            "What is the channel gonna be? example: [channel mention] [channel name] [channel id]",
            filter
          );
        const finalChan = client.resolveChannel(channel, message.guild);
        if (!finalChan) return message.reply("Invalid channel! Cancelling....");

        guiild.appLogs = finalChan.id;
        guiild.save();

        message.send(
          `The application logs are now ${finalChan} (${finalChan.name})`
        );
        break;
      case "enable":
        guiild.appToggle = true;
        guiild.save();

        message.send(`The application system is now enabled.`);
        break;
      case "disable":
        guiild.appToggle = false;
        guiild.save();

        message.send(`The application system is now enabled.`);
        break;
      case "acceptedrole":
        let channel1;
        if (args[1]) channel1 = args[1];
        if (!args[1])
          channel = await message.awaitReply(
            "What is the role gonna be? example: [role mention] [role name] [role id]",
            filter
          );
        const finalChan1 = client.resolveRole(channel1, message.guild);
        if (!finalChan1)
          return message.reply("Invalid channel! Cancelling....");

        guiild.add_role = finalChan1.id;
        guiild.save();

        message.send(
          `The application approved role is now ${finalChan1.name} (${finalChan1.id})`
        );
        break;
      default:
        message.channel.send(
          "Invalid option! Available options: `logs, enable, disable, acceptedrole`."
        );
    }
  },
};
