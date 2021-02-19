const fetch = require("node-fetch").default;
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "minecraft",
  aliases: ["mc"],
  category: "utility",
  description: "Get info about a minecraft server",
  requiredArgs: ["ip"],
  run: async (client, message, args) => {
    const ip = args[0];
    const json = await fetch(`https://api.mcsrvstat.us/2/${ip}`).then((rs) =>
      rs.json()
    );
    if (!json) return message.reply("The ip is invalid");

    const e = new MessageEmbed();
    if (json.online) {
      e.setColor("GREEN");
    } else {
      e.setColor("RED");
    }
    e.setTitle(json.hostname || ip + " Info")
      .setThumbnail(
        `https://eu.mc-api.net/v3/server/favicon/${ip.toLowerCaser()}`
      )
      .addField("IP", json.ip || "Not found", true)
      .addField("Port", json.port || "None", true)
      .addField("Version", json.version || "Not found", true)
      .addField(
        "Players",
        json.players ? json.players.online : "Not found",
        true
      )
      .addField("Max Players", json.players ? json.players.max : "Not found")
      .setTimestamp();
    message.send(e);
  },
};
