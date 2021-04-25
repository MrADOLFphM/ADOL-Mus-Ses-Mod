module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_response>",
  description: "add guild custom commands",
  category: "config",
  memberPermission: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    const cmdName = args[0];
    const cmdResponse = args.slice(1).join(" ");
    const lang = await message.guild.getLang();
    const conf = message.guild.getConfig();
    const commands = conf?.custom;
    if (!cmdName) return message.send(lang.CONFIG.ADD_CMD_NONAME);
    if (!cmdResponse) return message.send(lang.CONFIG.ADD_CMD_NORESPONSE);
    if (commands && commands.find((x) => x.name === cmdName.toLowerCase())) {
      return message.channel.send(lang.CONFIG.ADD_CMD_ALREADY_EXISTS);
    }

    if (client.commands.has(cmdName)) {
      return message.channel.send(lang.CONFIG.ADD_CMD_USED_BY_BOT);
    }

    const data = {
      name: cmdName.toLowerCase(),
      response: cmdResponse,
    };

    if (!commands) {
      message.guild.updateConfig({ custom: [data] });
    } else {
      message.guild.updateConfig({ custom: [...commands, data] });
    }

    return message.channel.send(
      lang.CONFIG.ADD_CMD_ADDED.replace("{name}", cmdName.toLowerCase())
    );
  },
};
