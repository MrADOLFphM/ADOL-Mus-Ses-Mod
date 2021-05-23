const ms = require("ms");

module.exports = {
  name: "edit-reminder",
  category: "reminder",
  description: "Edit an active reminder",
  requiredArgs: ["id", "time", "message"],
  run: async (client, message, args) => {
    const [id, time, description] = args;
    try {
      const user = await client.getUser(message.author);
      if (!user) {
        message.send(
          "You did not exist in my database therefore you must re-use this command."
        );
        return await client.createUser({ userID: message.author });
      }
      if (!user.reminder.hasReminder)
        return message.reply("You do not have any reminders active.");
      const reminder = user.reminder.reminders.find((r) => r.id === +id);
      const updated = user.reminder.reminders.filter((r) => r.id !== +id);
      if (!reminder) return message.reply("That reminder was not found.");
      reminder.time = time;
      reminder.ends_at = ms(time);
      reminder.msg = description;
      const newReminder = {
        time: time,
        ends_at: Date.now() + ms(time),
        msg: description,
        channel_id: reminder.channel_id,
        id: reminder.id,
      };
      await client.updateUser(message.author, {
        reminder: {
          hasReminder: true,
          reminders: [...updated, newReminder],
        },
      });
      return message.send("Updated your reminder :)");
    } catch (err) {
      return message.reply("Unexpected error has occured.");
    }
  },
};
