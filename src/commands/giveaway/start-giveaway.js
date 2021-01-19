const ms = require("ms");
const { hostedBy, everyoneMention } = require("../../../config.json");
const rModel = require("../../models/requirements");

module.exports = {
  name: "start-giveaway",
  description: "starts a giveaway",
  category: "giveaway",
  aliases: ["sg", "create-giveaway"],
  usage: "giveaway <channel> <time> <winners> <item>",
  run: async (client, message, args, color) => {
    // If the member doesn't have enough permissions
    if (
      !message.member.hasPermission("MANAGE_MESSAGES") &&
      !message.member.roles.cache.some((r) => r.name === "Giveaways")
    ) {
      return message.channel.send(
        ":x: You need to have the manage messages permissions to start giveaways."
      );
    }

    const filter = (res) => res.author.id === message.author.id;
    let chn = await message.awaitReply(
      "Mention the channel now you want the giveaway started in or type `cancel`",
      filter
    );
    if (!chn) return message.channel.send("Cancelled you have no time left!");
    if (chn === "cancel") return message.channel.send("cancelled");
    chn = chn.replace("<", "").replace("#", "").replace(">", "");
    let salon = message.guild.channels.cache.find((c) => c.id === chn);
    if (!salon) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("__ERROR__")
          .setColor("#FF0000")
          .setDescription(
            "I can't find this channel. Are you sure that I can see it?"
          )
      );
    }
    let giveawayChannel = salon;

    const msg = await message.awaitReply(
      "How long does the giveaway has to last? `send now`",
      filter
    );
    if (!msg) return message.channel.send("Cancelled you have no time left!");
    if (msg === "cancel") return message.channel.send("Cancelled!");
    const giveawayDuration = msg;

    // Number of winners
    const msg2 = await message.awaitReply(
      "How much winners do you want? `send now`",
      filter
    );
    if (!msg2) return message.channel.send("Cancelled you have no time left!");
    if (isNaN(msg2) || parseInt(msg2) <= 0)
      return message.channel.send("Thats not a valid number");
    if (msg2 === "cancel") return message.channel.send("Cancelled!");
    let giveawayNumberWinners = msg2;

    // Giveaway prize
    const msg3 = await message.awaitReply(
      "Whats the prize `send now`?",
      filter
    );
    if (!msg3) return message.channel.send("Cancelled you have no time left!");
    if (msg3 === "cancel") return message.channel.send("cancelled!");

    const giveawayPrize = msg3;
    // Start the giveaway
    await client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      time: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: giveawayNumberWinners,
      // Who hosts this giveaway
      hostedBy: hostedBy ? message.author : null,
      // Messages
      messages: {
        giveaway:
          (everyoneMention ? "@everyone\n\n" : "") + "🎉🎉 **GIVEAWAY** 🎉🎉",
        giveawayEnded:
          (everyoneMention ? "@everyone\n\n" : "") + "**GIVEAWAY ENDED**",
        timeRemaining: "Time remaining: **{duration}**!",
        inviteToParticipate: "React with 🎉 to participate!",
        winMessage: "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: "Giveaways",
        noWinner: "Giveaway cancelled, no valid participations.",
        hostedBy: "Hosted by: {user}",
        winners: "winner(s)",
        endedAt: "Ended at",
        units: {
          seconds: "seconds",
          minutes: "minutes",
          hours: "hours",
          days: "days",
          pluralS: false, // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
        },
      },
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);
  },
};
