const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "subreddit",
  description: "Returns a random reddit post",
  category: "utility",
 run: async (client, message, args) => {
    const subReddit = args[0];
    if(!message.channel.nsfw) {
        return message.reply('Because of some subreddits that have nsfw content this command is nsfw marked!')
    }

    if (!subReddit) {
      return message.channel.send("Please provide a subreddit.");
    }

    const data = await fetch(
      `https://www.reddit.com/r/${encodeURIComponent(subReddit)}/random.json`
    ).then((res) => res.json());

    try {
      const randomIndex = Math.floor(
        Math.random() * data[0].data.children.length
      );
      const children = data[0].data.children[randomIndex];
      const permaLink = children.data.permalink;
      const url = `https://reddit.com${permaLink}`;
      const image = children.data.url;

      const embed = new MessageEmbed()
        .setTitle(children.data.subreddit)
        .setURL(url)
        .setImage(image)
        .setColor("BLUE")
        .setFooter(message.author.username)
        .setTimestamp();

      message.channel.send(embed);
    } catch {
      return message.channel.send(
        "Subreddit was not found or an error occurred"
      );
    }
  },
};