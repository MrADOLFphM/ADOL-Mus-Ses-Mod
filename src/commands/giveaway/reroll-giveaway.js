const ms = require("ms");
module.exports = {
  name: "reroll-giveaway",
  description: "reroll a giveaway",
  category: "giveaway",
  aliases: ["rg"],
  usage: "reroll-giveaway <id>",
  run: async (client, message, args, color) => {
    // If the member doesn't have enough permissions
    if (
      !message.member.hasPermission("MANAGE_MESSAGES") &&
      !message.member.roles.cache.some((r) => r.name === "Giveaways")
    ) {
      return message.channel.send(
        ":x: You need to have the manage messages permissions to reroll giveaways."
      );
    }

    // If no message ID or giveaway name is specified
    if (!args[0]) {
      return message.channel.send(
        ":x: You have to specify a valid message ID!"
      );
    }

    // try to found the giveaway with prize then with ID
    let giveaway =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find(
        (g) => g.prize === args.join(" ")
      ) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if (!giveaway) {
      return message.channel.send(
        "Unable to find a giveaway for `" + args.join(" ") + "`."
      );
    }
    const filter = (res) => res.author.id === message.author.id;
    const msg = await message.awaitReply("How much winners do u want?", filter);
    if (!msg) msg = 1;
    const winners = msg;
    // Reroll the giveaway
    client.giveawaysManager
      .reroll(giveaway.messageID, {
        winnerCount: giveaway.winnerCount,
      })
      .then(() => {
        // Success message
        message.channel.send("Giveaway rerolled!");
      })
      .catch((e) => {
        if (
          e.startsWith(
            `Giveaway with message ID ${giveaway.messageID} is not ended.`
          )
        ) {
          message.channel.send("This giveaway is not ended!");
        } else {
          console.error(e);
          message.channel.send("An error occured...");
        }
      });
  },
};
