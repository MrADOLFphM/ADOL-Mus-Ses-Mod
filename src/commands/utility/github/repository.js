const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "github-repository",
  category: "utility",
  aliases: ["github-r"],
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("Please provide a github repository!");
    const resultsAll = await search(client, query);
    const results = resultsAll.slice(0, 10);

    if (!results) return message.send("There was an error searching");
    if (!results.length) return message.send("No results were found");
    if (results.length === 1) {
      await handleResult(client, message, results[0]);
    }
    const description = results.map(
      (item, i) =>
        `\`${formatIndex(i, results)}\`. ${searchResultFormatter(item)}`
    );
    const embed = new MessageEmbed()
      .setColor("BLACK")
      .setTitle("Type a number to choose a repository")
      .setAuthor("Results", client.user.displayAvatarURL())
      .setDescription(description);
    await message.send(embed);

    awaitResponseMessage(client, message, results);
  },
};
function searchResultFormatter(obj) {
  return `[${obj.full_name}](${obj.html_url})`;
}

async function search(client, query) {
  return client.apis.github.findRepositories(query, 10);
}
function formatIndex(index, results) {
  index++;
  if (results.length < 10) return index;
  return index.toString().padStart(2, "0");
}
function verifyCollected(selected, length) {
  const number = Math.round(Number(selected));
  return number <= length && !isNaN(number) && number > 0;
}

async function awaitResponseMessage(client, context, results) {
  const { author, channel } = context;
  const filter = (c) =>
    c.author.equals(author) && verifyCollected(c.content, results.length);

  channel.awaitMessages(filter, { time: 10000, max: 1 }).then((collected) => {
    if (collected.size > 0) {
      const result = results[Math.round(Number(collected.first().content)) - 1];
      console.log(result);
      handleResult(client, context, result);
    }
  });
}

function verifyCollected(selected, length) {
  const number = Math.round(Number(selected));
  return number <= length && !isNaN(number) && number > 0;
}
async function handleResult(client, message, repo) {
  const { channel } = message;
  const repositorySplitted = repo.full_name.split("/");
  const data = await client.apis.github.getRepository(
    repositorySplitted[0],
    repositorySplitted[1]
  );
  const embed = new MessageEmbed()
    .setColor("BLACK")
    .setAuthor("GitHub", client.user.displayAvatarURL())
    .setTitle(data.full_name)
    .setURL(data.html_url)
    .setThumbnail(data.owner.avatar_url)
    .setDescription(data.description || "No description")
    .addField("Watchers", client.utils.formatNumber(data.watchers), true)
    .addField("Stars", client.utils.formatNumber(data.stargazers_count), true)
    .addField("Forks", client.utils.formatNumber(data.forks), true);
  if (data.license && data.license.key !== "other") {
    embed.addField(
      "License",
      `[${data.license.spdx_id}](${data.license.url})`,
      true
    );
  }

  channel.send(embed);
}
