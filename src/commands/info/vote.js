module.exports = {
  name: "vote",
  description: "vote for me!",
  category: "utility",
  usage: "vote",
  aliases: ["invite", "support"],
  run: async (client, message, args) => {
    if (client.config.dblkey.length === 0) {
      message.channel.send("Your gay");
      throw new Error("Nothing");
    }
    const embed = message
      .embed()
      .setTitle("Vote for me on top.gg")
      .setDescription(
        "Voting gives you acces to 2 commands and a 1000 extra coins (2000 if weekend)"
      )
      .setURL("https://top.gg/bot/728694375739162685");
    message.channel.send(embed);
  },
};
