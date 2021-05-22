const discord = require("discord.js");
const app = require("../../models/application/application");
module.exports = {
  name: "addQuestions",
  aliases: ["aq", "addquestion"],
  description: "Add's questions to the Database",
  category: "application",
  memberPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let questions = args.slice(0).join(" ");

    let maxQuestions = 25;
    if (!questions)
      return message.channel.send(
        new discord.MessageEmbed()
          .setColor("RED")
          .setDescription("Missing args: [question]")
      );
    let split = questions.split("|");

    await app.findOne(
      {
        guildID: message.guild.id,
      },
      async (err, db) => {
        let arr = [];

        if (!db) {
          let actualArr = arr.concat(split);
          if (actualArr.length > maxQuestions) {
            return message.channel.send(
              new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`You can only add ${maxQuestions} question's!`)
            );
          }
          let newAppDB = new app({
            guildID: message.guild.id,
            questions: actualArr,
            appToggle: false,
            appLogs: null,
          });
          await newAppDB.save().catch((err) => {
            console.log(err);
          });

          return message.channel.send(
            new discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription("Added those question successfully")
          );
        }

        let ar = await db.questions;
        let actualArr = ar.concat(split);

        if (actualArr.length > maxQuestions) {
          return message.channel.send(
            new discord.MessageEmbed()
              .setColor("RED")
              .setDescription(`You can only add ${maxQuestions} question's`)
          );
        }
        await db.updateOne({
          questions: actualArr,
        });

        return message.channel.send(
          new discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription("Successfully added those questions!")
        );
      }
    );
  },
};
