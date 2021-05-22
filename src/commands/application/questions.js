const discord = require("discord.js");
const app = require("../../models/application/application.js");
module.exports = {
  name: "questions",
  description: "Get the questions!",
  category: "application",
  run: async (client, message, args) => {
    await app.findOne(
      {
        guildID: message.guild.id,
      },
      async (err, db) => {
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
            new discord.MessageEmbed()
              .setColor("RED")
              .setDescription("There are no questions.")
          );
        }

        if (db.questions.length === 0 || db.questions.length < 1)
          return message.channel.send(
            new discord.MessageEmbed()
              .setColor("RED")
              .setDescription("There are no questions.")
          );

        let text = "";
        let arrLength = db.questions.length;
        let arr = db.questions;
        for (let i = 0; i < arrLength; i++) {
          text += `\`${Number([i]) + 1}\` - ${arr[i]}\n`;
        }
        message.channel.send(
          new discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Questions**: \n${text}`)
        );
      }
    );
  },
};
