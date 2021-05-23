const { MessageEmbed } = require("discord.js");
const { getLastCommit } = require("git-last-commit");
module.exports = {
  name: "updates",
  description: "Learn more about current and future updates.",
  category: "info",
  usage: "updates",
  run: async (client, message, args) => {
    getLastCommit(function (err, commit) {
      const embed = new MessageEmbed()
        .setTitle("Updates!")
        .setDescription(
          `**Commit message:** [${commit.subject}](https://github.com/tovade/Andoi/commit/${commit.hash}) \n**Commit made by:** ${commit.author.name}\n **Branch:** ${commit.branch}`
        )
        .setTimestamp();
      message.send(embed);
    });
  },
};
