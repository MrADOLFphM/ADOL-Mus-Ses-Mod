module.exports = {
  name: "prefix",
  category: "config",
  usage: "prefix <new-prefix>",
  description: "Change the guild prefix",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You are not allowed or do not have permission to change prefix"
      );
    }
    let prefix = args[0];

    if (!prefix) {
      await client.updateConfig(message.guild, {
        prefix: client.config.configDefaultSettings.prefix,
      });
      return message.channel.send("reseted prefix!");
    }
    if (prefix.length > 5)
      return message.channel.send("Prefix must be less long than 5 characters");
    if (prefix) {
      await client.updateConfig(message.guild, { prefix: prefix });
      await message.channel.send(`Prefix is now ${prefix}`);
      await client.emit(
        "modlog",
        message.guild,
        "No one",
        "prefix",
        "None",
        message.member.user
      );
    }
  },
};
