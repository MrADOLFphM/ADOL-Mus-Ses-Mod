const { MessageEmbed } = require("discord.js");
const panelModel = require("../../models/config");
module.exports = {
  name: "panel",
  description: "Get the pannel!",
  cooldown: 3,
  category: "tickets",
  run: async (client, message, args) => {
    const panel = await panelModel.findOne({
      GuildID: message.guild.id,
    });
    if (!panel) {
      let a = new panelModel({
        GuildID: message.guild.id,
      });
      a.save();
    }
    if (panel) {
      const e = new MessageEmbed()
        .setTitle(`Panel`)
        .setDescription(
          `This is the panel if u react here a ticket will open.`
        );
      message.channel.send(e).then(async (msg) => {
        await panelModel.findOneAndUpdate({
          GuildID: message.guild.id,
          msg: msg.id,
        });
        await msg.react("🎫");
      });
    }
  },
};
