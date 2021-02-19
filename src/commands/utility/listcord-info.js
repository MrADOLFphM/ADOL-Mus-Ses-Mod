const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const listcord = require("../../modules/listcord");
module.exports = {
  name: "listcord-bot",
  description: "Get info about a bot on listcord",
  category: "utility",
  requiredArgs: ["botID"],
  run: async (client, message, args) => {
    const api = new listcord(client.config.listcord);
    const id = args[0];
    const bot = await api.getBot(id);
    if (!bot) return message.reply("That bot is not on listcord!");
    const embed = new MessageEmbed()
      .setTitle(`${bot.name}'s info!`)
      .setThumbnail(bot.avatar)
      .setDescription(bot.description.short)
      .addField("Developers", getDevelopers(bot.developers).join(", "), true)
      .addField("Upvotes", bot.upvotes, true)
      .addField(
        "Support server",
        bot.support_server ? bot.support_server : "None",
        true
      )
      .addField("Tags", bot.tags.join(", "), true)
      .addField("Prefix", bot.prefix, true)
      .addField(
        "Created on",
        moment(bot.createdAt).format("dddd, Do MMMM YYYY"),
        true
      );
    message.send(embed);

    function getDevelopers(ids) {
      const arr = [];
      ids.forEach((id) => {
        const u = client.users.cache.get(id);
        arr.push(u.tag);
      });
      return arr;
    }
  },
};
