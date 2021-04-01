module.exports = {
  name: "remove-reminder",
  description: "Remove your reminder",
  category: "reminders",
  requiredArgs: ["id"],
  run: async (client, message, args) => {
    const [id] = args;
    try {
      const user = await client.getUser(message.author);
      if (!user) return;
      if (!user?.reminder.hasReminder === false)
        return message.reply("You don't have any reminders");
      await client.updateUser(message.author, {
        reminder: {
          hasReminder: user.reminder.reminders?.length - 1 > 0,
          reminders: user.reminder.reminders.filter((r) => r.id !== +id),
        },
      });
    } catch (err) {
      message.send("An unexpected error has occured!");
    }
  },
};
