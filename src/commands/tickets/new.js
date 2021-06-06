const createTicket = require("../../utils/ticket");
const guildModel = require("../../models/config");
const configModel = require("../../models/ticketcf");
module.exports = {
  name: "new",
  description: "makes a ticket channel!",
  cooldown: 3,
  category: "tickets",
  run: async (client, message, args) => {
    const modd = await configModel.findOne({ guild: message.guild.id });
    if (!modd) return message.send("The ticket system is not setup!");
    const guildDoc = await guildModel.findOne({ GuildID: message.guild.id });
    const e = message.member;
    const user = await message.guild.members.cache.get(e.id);
    let r = args.join(" ");
    if (!args.length) r = "Not provided.";
    await createTicket(message, user, guildDoc, r);
  },
};
