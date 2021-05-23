module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "config",
  aliases: ["removecmd"],
  memberPermissions: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    const cmdName = args[0];
    const guild = await client.getConfig(message.guild);
    const commands = guild.custom;
    const lang = await message.guild.getLang();

    if (commands) {
      const data = commands.find((cmd) => cmd.name === cmdName.toLowerCase());

      if (!data) {
        return message.channel.send(lang.CONFIG.DEL_CMD_NOT_FOUND);
      }

      const filtered = commands.filter(
        (cmd) => cmd.name !== cmdName.toLowerCase()
      );

      await message.guild.updateConfig({
        custom: filtered,
      });
      return message.channel.send(
        lang.CONFIG.DEL_CMD_DELETED.replace("{cmd}", cmdName)
      );
    } else {
      return message.channel.send(lang.CONFIG.DEL_CMD_NO_COMMANDS);
    }
  },
};
