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
    const conf = await client.getConfig(message.guild);
    let channel = conf.modlog;
    if (channel == null) return;

    if (!channel) return;

    const embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("Moderation", "Purge")
      .addField("Messages", `${args[0]}`)
      .addField("Channel", `${message.channel}`)
      .addField("Used by:", message.author.username)
      .addField("Date", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  },
};
