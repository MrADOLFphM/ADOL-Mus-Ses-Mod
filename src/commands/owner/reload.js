module.exports = {
  name: "reload",
  description: "lol",
  category: "owner",
  aliases: ["rel"],
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const com = args[0];
    if (!com) return message.send("Wich command do you want to reload");
    const c = client.commands.get(com);
    if (!c) return message.reply("I did not find that command");
    client.reload(com);
    message.reply("Reloaded command succesfully");
  },
};
