const {
  getStoreItems,
  getUserInventory,
  getUserMoney,
  setUserInventory,
  removeUserMoney,
} = require("../../utils/economy");
const itemss = require("../../utils/items");

module.exports = {
  name: "buy",
  description: "Buy an item from the store",
  category: "economy",
  usage: "buy <item name>",
  cooldown: 10,
  run: async (client, message, args) => {
    const e = await client.getConfig(message.guild);
    const guildId = message.guild.id;
    const storeItems = await getStoreItems(guildId);
    const usersInventory = await getUserInventory(guildId, message.author.id);
    const prefix = e.prefix;
    const usersMoney = await getUserMoney(message.author.id);
    let query = args[0];

    if (storeItems === null || !storeItems[0])
      return message.channel.send(
        `The store for this server is empty! Ask a moderator to add items to the store using \`${prefix}store add <item>\` `
      );

    if (!query) return message.channel.send("Please provide an item to buy!");

    query = query.toLowerCase();
    const item = storeItems.filter((storeItem) => storeItem.name === query)[0];
    if (!item)
      item = itemss.find(
        (x) =>
          x.name.toLowerCase() === args.join(" ").toString().toLowerCase() ||
          x.name.toLowerCase() === args[0].toString().toLowerCase() ||
          x.name.toLowerCase() ===
            `${args[0]
              .toString()
              .toLowerCase()} ${args[1].toString().toLowerCase()}`
      );
    if (!item)
      return message.channel.send(
        `**${query}** wasn't found in the store, please use \`${prefix}store\` or \`${prefix}andoistore\` to see all items in the store`
      );

    if (usersInventory !== null && usersInventory.includes(item.name))
      return message.channel.send("You already own this item!");

    if (!usersMoney !== null && usersMoney < item.price)
      return message.channel.send(
        "You don't have enough money to buy this item!"
      );
    if (!itemss.includes(item)) {
      setUserInventory(guildId, message.author.id, item.name);
      removeUserMoney(message.author.id, item.price);
      message.channel.send(
        `Successfully bought **${item.name}** paid **${item.price}**`
      );
    } else {
      const u = await client.getUser(user.id);
      u.inventory.push(item);
      u.save();
      removeUserMoney(message.author.id, item.price);
      message.channel.send(
        `Successfully bought **${item.name}** paid **${item.price}**`
      );
    }
  },
};
