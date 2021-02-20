const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ipinfo",
  description: "Gets info about an ip adress",
  category: "utility",
  aliases: ["ip"],
  requiredArgs: ["ip"],
  run: async (client, message, [ip]) => {
    try {
      await ipInfo(ip).then((r) => {
        if (r.status === "success") {
          let embed = new MessageEmbed()
            .setTitle("Ip information")
            .setColor("GREEN")
            .setDescription(`**Mobile:** ${r.mobile}\n**Proxy:** ${r.proxy}`)
            .addField("Internet service provider:", r.isp, true)
            .addField("As numer and organization:", r.as, true)
            .addField("continent:", r.continent, true)
            .addField("Country", r.country, true)
            .addField("City", r.city, true)
            .addField("Timezone:", r.timezone, true)
            .addField("Currency", r.currency, true)
            .setTimestamp();
          return message.send(embed);
        } else {
          return message.reply("Enter an valid ip adress!");
        }
      });
    } catch (err) {
      client.logger.warn(err);
      message.send(
        "An unexpected error has occured please contact an developer!"
      );
    }
    async function ipInfo(ip) {
      return await fetch(
        `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,query`
      ).then((res) => res.json());
    }
  },
};
