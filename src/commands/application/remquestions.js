const discord = require("discord.js");
const app = require("../../models/application/application.js");
module.exports = {
  name: "remquestion",
  aliases: ["rq", "removequestions"],
  description: "Remove questions from the Database",
  category: "application",
  memberPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let number = args[0];
    if (!number || isNaN(number) || number === "0")
      return message.channel.send(
        new discord.MessageEmbed()
          .setColor("RED")
          .setDescription("Provide the number of the question to remove")
      );

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
              .setDescription("There are no questions")
          );
        }

        let questions = db.questions;
        let num = Number(number) - 1;

        if (!questions[num])
          return message.channel.send(
            new discord.MessageEmbed()
              .setColor("RED")
              .setDescription("That question does not exist!")
          );

        questions.splice(num, 1);

        await db.updateOne({
          questions: questions,
        });

        return message.channel.send(
          new discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription("Succesfully removed a question from the database.")
        );
      }
    );
  },
};
