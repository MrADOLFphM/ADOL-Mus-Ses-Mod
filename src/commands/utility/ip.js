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
      await this.ipInfo(ip).then((r) => {
        if (r.data.status === "succes") {
          let embed = new MessageEmbed()
            .setTitle("Ip information")
            .setColor("GREEN")
            .setDescription(
              `**Mobile:** ${r.data.mobile}\n**Proxy:** ${r.data.proxy}`
            )
            .addField("Internet service provider:", r.data.isp, true)
            .addField("As numer and organization:", r.data.as, true)
            .addField("continent:", r.data.continent, true)
            .addField("Country", r.data.country, true)
            .addField("City", r.data.city, true)
            .addField("Timezone:", r.data.timezone, true)
            .addField("Currency", r.data.currency, true)
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
  },
  async ipInfo(ip) {
    return await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,query`
    ).then((res) => res.json());
  },
};
