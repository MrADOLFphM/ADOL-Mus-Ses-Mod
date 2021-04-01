const { MessageEmbed } = require("discord.js");
const model = require("../models/userEco");
module.exports = async (client) => {
  setInterval(async () => {
    const reminders = await model.find({ "reminder.hasReminder": true });
    if (!reminders) return;
    reminders.forEach((user) => {
      user.reminder.reminders
        .filter((r) => r.ends_at <= Date.now())
        .forEach(async (re) => {
          const { channel_id, msg, time, _id: reminderId } = re;
          const usr = client.users.cache.get(user.userID);
          const channel = client.channels.cache.get(channel_id);
          if (!channel) {
            await client.updateUser(usr, {
              reminder: {
                hasReminder: !(user.reminder.reminders?.length - 1 === 0),
                reminders: user.reminder.reminders.filter(
                  (rem) => rem.id !== reminderId
                ),
              },
            });
            return;
          }
          await client.updateUser(usr, {
            reminder: {
              hasReminder: !(user.reminder.reminders?.length - 1 === 0),
              reminders: user.reminder.reminders.filter(
                (rem) => rem.id !== reminderId
              ),
            },
          });
          const embed = new MessageEmbed()
            .setTitle("Reminder finished")
            .setDescription(`Your time ${time} has ended`)
            .addField("Reminder message", msg);
          channel.send(`<@${user.userID}>`, embed);
        });
    });
  }, 10000);
};
