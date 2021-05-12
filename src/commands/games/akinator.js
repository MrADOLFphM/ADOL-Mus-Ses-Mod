const { MessageEmbed } = require("discord.js");
const { Aki } = require("aki-api");
const { list } = require("../../utils/functions");
const regions = ["person", "object", "animal"];
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"];
const isPlaying = new Set();
module.exports = {
  name: "akinator",
  aliases: ["aki", "guesswho"],
  category: "games",
  usage: "[person | object | animal]",
  description:
    "Think About A Real or Fictional Character, I Will Try To Guess It",
  run: async (bot, message, args, ops) => {
    if (!message.channel.permissionsFor(bot.user).has("EMBED_LINKS"))
      return message.channel.send("**Missing Permissions - [EMBED_LINKS]!**");
    if (!args[0])
      return message.channel.send(
        `**What Category Do You Want To Use? Either \`${list(
          regions,
          "or"
        )}\`!**`
      );
    let stringAki = args[0].toLowerCase();
    let region;
    if (stringAki === "person".toLocaleLowerCase()) region = "en";
    if (stringAki === "object".toLocaleLowerCase()) region = "en_objects";
    if (stringAki === "animal".toLocaleLowerCase()) region = "en_animals";
    if (!regions.includes(stringAki))
      return message.channel.send(
        `**What Region Do You Want To Use? Either \`${list(regions, "or")}\`!**`
      );
    const aki = new Aki(region);
    if (isPlaying.has(message.author.id)) {
      return message.channel.send(":x: | The game already started..");
    }

    isPlaying.add(message.author.id);

    await aki.start();

    const msg = await message.channel.send(
      new MessageEmbed()
        .setTitle(`${message.author.username}, Question ${aki.currentStep + 1}`)
        .setColor("RANDOM")
        .setDescription(
          `**${aki.question}**\n${aki.answers
            .map((an, i) => `${an} | ${emojis[i]}`)
            .join("\n")}\n end | ${emojis.last()}`
        )
    );

    for (const emoji of emojis) await msg.react(emoji);

    const collector = msg.createReactionCollector(
      (reaction, user) =>
        emojis.includes(reaction.emoji.name) && user.id == message.author.id,
      {
        time: 60000 * 6,
      }
    );

    collector
      .on("end", () => isPlaying.delete(message.author.id))
      .on("collect", async ({ emoji, users }) => {
        users.remove(message.author).catch(() => null);

        if (emoji.name == "❌") {
          collector.stop();
          msg.reactions.removeAll();
          return msg.edit(
            new MessageEmbed()
              .setTitle("Game finished")
              .setDescription("**You stopped the game so i geuss i won!**")
              .setTimestamp()
          );
        }

        await aki.step(emojis.indexOf(emoji.name));

        if (aki.progress >= 70 || aki.currentStep >= 78) {
          await aki.win();
          msg.reactions.removeAll();
          collector.stop();

          message.channel.send(
            new MessageEmbed()
              .setTitle("Is this your character?")
              .setDescription(
                `**${aki.answers[0].name}**\n${aki.answers[0].description}\nRanking as **#${aki.answers[0].ranking}**\n\n[yes (**y**) / no (**n**)]`
              )
              .setImage(aki.answers[0].absolute_picture_path)
              .setColor("RANDOM")
          );

          const filter = (m) =>
            /(yes|no|y|n)/i.test(m.content) && m.author.id == message.author.id;

          message.channel
            .awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ["time"],
            })
            .then((collected) => {
              const isWinner = /yes|y/i.test(collected.first().content);
              message.channel.send(
                new MessageEmbed()
                  .setTitle(
                    isWinner
                      ? "Great! Guessed right one more time."
                      : "Uh. you have won"
                  )
                  .setColor("RANDOM")
                  .setDescription("I love playing with you!")
              );
            })
            .catch(() => null);
        } else {
          msg.edit(
            new MessageEmbed()
              .setTitle(
                `${message.author.username}, Question ${aki.currentStep + 1}`
              )
              .setColor("RANDOM")
              .setDescription(
                `**${aki.question}**\n${aki.answers
                  .map((an, i) => `${an} | ${emojis[i]}`)
                  .join("\n")}`
              )
          );
        }
      });
  },
};
