const { MessageEmbed } = require("discord.js");
const {
  getUserMoney,
  getUserBank,
  getUserInventory,
  getUserJob,
} = require("../../utils/economy");

module.exports = {
  name: "profile",
  description: "See the full profile of a user",
  category: "economy",
  run: async (client, message) => {
    const conf = await client.getConfig(message.guild);
    const user = message.mentions.users.first() || message.author;
    const userId = user.id;
    const guildId = message.guild.id;
    const money = (await getUserMoney(userId)) || 0;
    const bank = (await getUserBank(userId)) || 0;
    const inventory = (await getUserInventory(userId)) || [];
    const serverPrefix = conf.prefix;
    const job = await getUserJob(user.id);
    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s profile`)
      .addField("**Money**", money, true)
      .addField("**Job**", job.job, true)
      .addField("**Bank**", bank, true)
      .addField("**Inventory Items**", inventory.length, true)
      .setDescription(
        `Use \`${serverPrefix}inventory <user>\` to view their inventory items.`
      )
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
