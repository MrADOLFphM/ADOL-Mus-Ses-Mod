const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { mem, cpu, os } = require("node-os-utils");
const botModel = require("../../models/bot");
const { stripIndent } = require("common-tags");
module.exports = {
  name: "botinfo",
  description: "get info about the  bot",
  aliases: ["stats"],
  category: "info",
  usage: "botinfo",
  run: async (client, message, args) => {
    const d = moment.duration(client.uptime);
    const bot = await botModel.findOne({ name: "Andoi" });
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const clientStats = stripIndent`
      Servers   :: ${message.client.guilds.cache.size}
      Users     :: ${message.client.users.cache.size}
      Channels  :: ${message.client.channels.cache.size}
      WS Ping   :: ${Math.round(message.client.ws.ping)}ms
      Uptime    :: ${days} and ${hours}
    `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
      OS        :: ${await os.oos()}
      CPU       :: ${cpu.model()}
      Cores     :: ${cpu.count()}
      CPU Usage :: ${await cpu.usage()} %
      RAM       :: ${totalMemMb} MB
      RAM Usage :: ${usedMemMb} MB 
    `;

    const embed = new MessageEmbed()
      .setTitle("Bot's Statistics")
      .addField(
        "Commands",
        `\`${message.client.commands.size}\` commands`,
        true
      )
      .addField(
        "Commands executed after last restart:",
        bot.commandssincerestart,
        true
      )
      .addField("Total commands used:", `\`${bot.total}\``, true)
      .addField("Aliases", `\`${message.client.aliases.size}\` aliases`, true)
      .addField("Client", `\`\`\`asciidoc\n${clientStats}\`\`\``)
      .addField("Server", `\`\`\`asciidoc\n${serverStats}\`\`\``)
      .setFooter("Andoi bot `created by: Tovade#6617 and Potatoexe2930#1771")
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  },
};
