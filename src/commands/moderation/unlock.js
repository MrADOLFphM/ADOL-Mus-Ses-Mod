module.exports = {
  name: "unlock",
  category: "moderation",
  description: "unlock a channel",
  aliases: ["unlockchannel"],
  usage: "unlock <channel>",
  run: async (client, message, args) => {
    //code here
    const lang = await message.guild.getLang();

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.send(lang.I_PERM.replace("{perm}", "MANAGE_CHANNELS"));
    const user = message.member;
    const channel = message.mentions.channels.first() || message.channel;

    if (!user.hasPermission(["MANAGE_CHANNELS"]))
      return message.channel.send(
        lang.NO_PERMS.replace("{perm}", "MANAGE_CHANNELS")
      );

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true,
    });
    message.channel.send(
      lang.MODERATION.UNLOCK_SUCCES.replace("{channel}", channel)
    );
    await client.emit("modlog", message.guild, "No one", "unlock", "None");
  },
};
