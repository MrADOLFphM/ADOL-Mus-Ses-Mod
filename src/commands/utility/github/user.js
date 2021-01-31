const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "github-user",
  aliases: ["github-u"],
  category: "utility",
  run: async (client, message, args) => {
    if (!(await getUser(client, message, args.join(" "))))
      return message.send("Did not find the user on github!");
  },
};
async function getUser(client, message, user) {
  const { channel } = message;
  try {
    channel.startTyping();
    const data = await client.apis.github.getUser(user);
    const embed = new MessageEmbed()
      .setColor("BLACK")
      .setAuthor("GitHub", client.user.displayAvatarURL())
      .setTitle(`${data.login}${data.name ? ` - ${data.name}` : ""}`)
      .setURL(data.html_url)
      .setThumbnail(data.avatar_url)
      .setDescription(data.bio || "No bio")
      .addField("Followers", client.utils.formatNumber(data.followers), true)
      .addField("Following", client.utils.formatNumber(data.following), true)
      .addField(
        "Created At",
        `${moment(data.created_at).format("LLL")}\n(${moment(
          data.created_at
        ).fromNow()})`,
        true
      );
    if (data.public_repos > 0) {
      const repos = await client.apis.github.getUserRepositories(user);
      embed.addField(
        "Repositories",
        `${repos
          .slice(0, 5)
          .map((r) => `${r.full_name}`)
          .join("\n")}`,
        true
      );
    }
    await channel.send(embed).then(() => channel.stopTyping());
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
