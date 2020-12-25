module.exports = {
    name: "delcmd",
    usage: "delcmd <cmd_name>",
    description: "Delete the custom commannd",
    category: "config",
    aliases: ["removecmd"],
    memberPermissions: ["ADMINISTRATOR"],
    run: async(client, message, args) => {
      const cmdName = args[0];
      const guild = await client.getConfig(message.guild);
      const commands = guild.custom;
  
      if (!cmdName) {
        return message.channel.send(":x: Please provide a command name, `delcmd <cmd_name>`");
      }
  
      if (commands) {
        const data = commands.find((cmd) => cmd.name === cmdName.toLowerCase());
  
        if (!data) {
          return message.channel.send(":x: That command was not found.");
        }
        const filtered = commands.filter((cmd) => cmd.name !== cmdName.toLowerCase());
  
        await client.updateConfig(message.guild, {
          custom: filtered,
        });
        return message.channel.send(`Deleted the **${cmdName}** Command!`);
      } else {
        return message.channel.send(":x: Sorry but i am unable to find that command!");
      }
    },
  };