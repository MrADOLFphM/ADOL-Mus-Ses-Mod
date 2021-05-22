const discord = require("discord.js");
const app = require("../../models/application/application.js");
const sendQuestions = require("../../helpers/sendQuestions");
module.exports = {
  name: "apply",
  description: "Apply to get a staff rank",
  category: "application",
  run: async (client, message, args) => {
    const closed = new discord.MessageEmbed()
      .setDescription(
        `The current server does not have any questions to apply to.`
      )
      .setColor("RED");

    const closed2 = new discord.MessageEmbed()
      .setDescription(
        `I could not find the guild's apply Log channel. Please make sure to let an admin know.`
      )
      .setColor("RED");

    let db = await app.findOne({
      guildID: message.guild.id,
    });

    if (!db) {
      let newAppDB = new app({
        guildID: message.guild.id,
        questions: [],
        appToggle: false,
        appLogs: null,
      });
      await newAppDB.save().catch((err) => {
        console.log(err);
      });

      return message.channel.send(
        new discord.MessageEmbed().setColor("RED").setDescription(closed)
      );
    }

    if (db.questions.length === 0 || db.questions.length < 1)
      return message.channel.send(closed);
    if (
      db?.appLogs === null ||
      !db.appLogs ||
      !client.channels.cache.get(db.appLogs)
    )
      return message.channel.send(closed2);
    const channel = await message.guild.channels.cache.get(db.appLogs);
    if (!channel) return message.channel.send(closed);
    await message.channel
      .send(
        new discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `${client.emotes.success} | Your application will go through in your dms due to privacy reasons.`
          )
      )
      .then(() => sendQuestions(client, message, message.author, db))
      .catch((err) => {
        console.log(err);
        return message.channel.send(
          ` ${client.emotes.error} Couldn't send you the questions, your dms are closed - ${message.author}`
        );
      });
  },
};
