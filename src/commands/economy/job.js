const { MessageEmbed } = require("discord.js");
const { setUserJob, getUserJob } = require("../../utils/economy");
module.exports = {
  name: "job",
  description: "Assign a job!",
  category: "economy",
  cooldown: 5,
  run: async (client, message, args) => {
    const current = await getUserJob(message.author.id);
    const jobs = [
      "developer",
      "designer",
      "construction worker",
      "chief",
      "mechanic",
      "content creator",
      "artist",
      "painter",
      "truck driver",
      "uber driver",
      "project manager",
      "dentist",
      "it manager",
      "nurse",
      "accountant",
      "lawyer",
    ];
    if (!args[0])
      return message.channel.send(
        "Please mention an option `assign, re-assign, un-assign`"
      );

    switch (args[0].toLowerCase()) {
      case "assign":
        if (current.job) {
          message.channel.send(
            "Hey you already have a job instead of using assign use reassign!"
          );
        } else {
          if (jobs.includes(args[1])) {
            await setUserJob(message.author.id, args[1]);
            message.channel.send(`Your job is now ${args[1]}`);
          } else {
            message.channel.send("This job doesnt exist!");
            const e = new MessageEmbed().setColor(`BLUE`);
            jobs.forEach((job) => {
              e.addField(`${job}`, "|| ||");
            });
            message.channel.send(e);
          }
        }
        break;
      case "re-assign":
      case "reassign":
        if (jobs.includes(args[1])) {
          await setUserJob(message.author.id, args[1]);
          message.channel.send(
            `You have re-assigned, your job is now ${args[1]}`
          );
        } else {
          message.channel.send("This job doesnt exist!");
          const e = new MessageEmbed().setColor(`BLUE`);
          jobs.forEach((job) => {
            e.addField(`${job}`, "|| ||");
          });
          message.channel.send(e);
        }
        break;
      case "un-assign":
        await setUserJob(message.author.id, null);
        message.channel.send("Now you dont have a job anymore");
    }
  },
};
