const fetchAll = require("../helperUtil/fetchAll");
const emojiArray = require("../../utils/optionArray");
const pollModel = require("../../models/poll");
module.exports = (client) => {
  setInterval(async () => {
    for (const guild of client.guilds.cache) {
      const pollArray = await pollModel
        .find({
          guild: guild[0],
        })
        .catch((err) => console.log(err));

      for (const poll of pollArray) {
        if (Date.now() >= Number(poll.expiryDate)) {
          const channel = client.channels.cache.get(poll.textChannel);
          const msg = await channel.messages
            .fetch(poll.message)
            .catch((err) => console.log(err));

          const resultsArr = [];

          for (const e of emojiArray()) {
            const allReactions = await fetchAll(msg, e).catch((err) =>
              console.log(err)
            );
            resultsArr.push([
              e,
              typeof allReactions == "object" ? allReactions.length : undefined,
            ]);
          }

          resultsArr.sort((a, b) => b[1] - a[1]);

          if (resultsArr[0][1] == resultsArr[1][1]) {
            channel.send(
              `It was a tie! \nhttps://discordapp.com/channels/${msg.guild.id}/${channel.id}/${msg.id}`
            );
          } else {
            channel.send(
              `The winner of the poll was option ${resultsArr[0][0]} \nhttps://discordapp.com/channels/${msg.guild.id}/${channel.id}/${msg.id}`
            );
          }

          await poll.deleteOne().catch((err) => console.log(err));
        }
      }
    }
  }, 30000);
};
