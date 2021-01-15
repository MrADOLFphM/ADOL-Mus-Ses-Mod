const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "embed",
  category: "utility",
  run: async (bot, message, args) => {
    const question =
      "🌇 ❯ to add a image\n 🎫  ❯ to add a thumbnail\n 📜  ❯ to add a description\n 📌  ❯ to add a title\n 🧑 ❯ to add a author\n 🔗  ❯ to add a url";
    const filter = (user, reaction) => user.id === message.author.id;
    const reactions = ["🌇", "🎫", "📜", "📌", "🧑", "🔗"];
    await send();
    async function send() {
      const e = await message.awaitReact(question, filter, reactions);
    }
    let image;
    let description;
    let thumbnail;
    let title;
    let author;
    let url;
    const linkregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&/\\/=]*)/g;
    const collector = message.channel.createMessageCollector(
      (m) => m.author.id === message.author.id,
      { idle: 120000 }
    );
    collector.on("collect", async (m) => {
      if (e === "🌇") {
        if (m.content === "none") {
          image = undefined;

          await send();
        } else {
          if (!m.attachments.first() && !linkregex.test(m.content))
            return message.channel.send("Invalid URL");
          else if (m.attachments.first()) {
            authorimg = m.attachments.first().url;
            i++;
          } else if (linkregex.test(m.content)) {
            authorimg = m.content;
          }
        }
      }
    });
  },
};
