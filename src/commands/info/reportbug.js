const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "report-bug",
  category: "utility",
  description: "report a bug to us",
  aliases: ["bg"],
  usage: "report-bug <bug>",
  run: (client, message, args) => {
    let timeInfo;
    {
      time = 0;
      timeInfo = "is permanent!";
    }

    const query = args.join(" ");
    if (!query) return message.reply("Please specify a query");

    message.channel
      .createInvite({
        unique: true,
        maxAge: time,
      })
      .then((invite) => {
        const reportEmbed = new MessageEmbed()
          .setTitle("New Report")
          .addField("Author", message.author.toString(), true)
          .addField("Guild", message.guild.name, true)
          .addField("Report", query)
          .setDescription("Invite link: https://discord.gg/" + invite.code)
          .setFooter(`This link ${timeInfo}`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp();
        client.channels.cache.get(client.config.bugchannel).send(reportEmbed);

        message.channel.send(`${client.emotes.success}Bug Reported!`);
      });
  },
};
