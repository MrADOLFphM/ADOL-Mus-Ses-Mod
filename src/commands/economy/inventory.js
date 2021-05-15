const { MessageEmbed } = require("discord.js");
const { getUserInventory, getGuildInventory } = require("../../utils/economy");

module.exports = {
  name: "inventory",
  description: "View your or a user inventory",
  category: "economy",
  usage: "inventory <user>",
  run: async (client, message) => {
    const user = message.mentions.users.first() || message.author;
    let usersInventory = await getUserInventory(message.guild.id, user.id);

    if (usersInventory === null || !usersInventory[0])
      usersInventory = await getGuildInventory(message.guild.id, user.id);
    if (usersInventory === null || !usersInventory[0])
      return message.send("That user has an empty inventory.");
    const inventory = usersInventory.map((item) => item).join(",\n ");

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Inventory`)
      .setDescription(`${inventory}`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
