const ms = require("ms");
module.exports = {
  name: "setreminder",
  description: "set a reminder for later...",
  category: "reminder",
  requiredArgs: ["time", "message"],
  run: async (client, message, args) => {
    const [time, ...rest] = args;
    const msg = rest.join(" ");
    const isValid = ms(time);
    if (!isValid) return message.send("Are you sure that is a valid time?");
    const user = await client.getUser(message.author);
    if (!user) return;
    const reminders =
      typeof user.reminder.reminders === "object"
        ? user.reminder.reminders
        : [];
    await client.updateUser(message.author, {
      reminder: {
        hasReminder: true,
        reminders: [
          ...reminders,
          {
            ends_at: Date.now() + ms(time),
            msg,
            channel_id: message.channel.id,
            time,
            id: reminders.length + 1,
          },
        ],
      },
    });
    return message.send("Succesfully placed a reminder!");
  },
};
