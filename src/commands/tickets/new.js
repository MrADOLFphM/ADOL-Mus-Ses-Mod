const createTicket = require("../../utils/ticket");
const guildModel = require("../../models/config");
module.exports = {
  name: "new",
  description: "makes a ticket channel!",
  cooldown: 3,
  category: "tickets",
  run: async (client, message, args) => {
    const guildDoc = await guildModel.findOne({ GuildID: message.guild.id });
    const e = message.member;
    const user = await message.guild.members.cache.get(e.id);
    await createTicket(message, user, guildDoc);
  },
};
