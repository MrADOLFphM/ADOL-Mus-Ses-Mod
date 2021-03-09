const ReactionPages = require("../../modules/paginate");
const { MessageEmbed } = require("discord.js");
const emotes = require("../../JSON/emojis.json");
module.exports = {
  name: "memberslb",
  category: "utility",
  description: "List the members who joined this server in a leaderboard",
  run: async (client, message, args) => {
    try {
      const members = message.guild.members.cache
        .filter((m) => !m.user.bot)
        .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);

      const arrayOfMembers = members.array();
      const ids = [];
      arrayOfMembers.forEach((mem) => {
        ids.push(mem.user.id);
      });

      let index = 1;
      if (ids.length > 10) {
        const chunks = convertChunk(ids, 10);
        const arry = [];
        for (chunk of chunks) {
          const description = chunk.map(
            (v) =>
              `#${index++} **${message.guild.members.cache.get(v).user.tag}**`
          );
          arry.push(
            new MessageEmbed()
              .setTitle("Join Leaderboard in " + message.guild.name)
              .setDescription(description)
              .setColor("RANDOM")
          );
        }
        ReactionPages(message, arry);
      } else {
        const description = ids.map(
          (v) =>
            `#${index++} **${message.guild.members.cache.get(v).user.tag}**`
        );
        message.channel.send(
          new MessageEmbed()
            .setTitle("Join Leaderboard in " + message.guild.name)
            .setDescription(description)
            .setColor("RANDOM")
        );
      }
    } catch (err) {
      return message.channel
        .send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`)
        .then((msg) => {
          setTimeout(() => {
            msg.edit(
              `${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`links\` command to join the support server for support`
            );
          }, 3000);
        });
    }
  },
};

function convertChunk(arr, size) {
  const array = [];
  for (let i = 0; i < arr.length; i += size) {
    array.push(arr.slice(i, i + size));
  }
  return array;
}
