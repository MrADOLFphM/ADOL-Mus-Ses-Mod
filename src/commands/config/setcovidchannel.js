const Discord = require("discord.js");
const autoCovid = require("../../helpers/autoCovid");
const covidModel = require("../../models/covid");
module.exports = {
  name: "setcovid",
  category: "config",
  usage: "setcovid <#channel>",
  description: "Set the covid auto posting channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );

    const covid = await covidModel.findOne({ guild: message.guild.id });
    if (!args[0]) {
      if (covid) {
        const e = await covidModel.findOneAndUpdate({
          guild: message.guild.id,
          enabled: false,
          channelID: null,
        });

        return message.channel.send(
          "The covid auto posting channel has been reset since no channel was provided"
        );
      } else {
        const re = new covidModel({
          guild: message.guild.id,
          enabled: false,
          channelID: null,
        });
        re.save();
        return message.channel.send(
          "The covid auto posting channel has been reset since no channel was provided"
        );
      }
    }
    let channel = client.findChannel(message, args, false);
    if (covid) {
      await covid.updateOne({
        guild: message.guild.id,
        channelID: channel.id,
        enabled: true,
      });
      message.channel.send(
        `Covid auto posting Channel is setted as ${channel}`
      );
      setInterval(async () => {
        await autoCovid(client, message.guild.id);
      }, 43200000);
    } else {
      const re = new covidModel({
        guild: message.guild.id,
        channelID: channel.id,
        enabled: true,
      });
      re.save();
      message.channel.send(
        `Covid auto posting Channel is setted as ${channel}`
      );
      setInterval(async () => {
        await autoCovid(client, message.guild.id);
      }, 43200000);
    }
  },
};
