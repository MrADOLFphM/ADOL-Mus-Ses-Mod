const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "reminders",
  description: "Check you're reminders",
  category: "reminder",
  run: async (client, message, args) => {
    try {
      const member = client.findMember(message, args, true);
      const user = await client.getUser(member.user);
      if (!user) return;
      if (!user.reminder.hasReminder === true) {
        return message.reply("This user has no reminders.");
      }
      const mappedReminders = user.reminder.reminders.map((reminder) => {
        const endsAt = moment
          .duration(reminder.ends_at - Date.now())
          .format("D [days], H [Hrs], m [mins], s [secs]");
        return `**Message:** ${reminder.msg}
          **Time:** ${reminder.time}
          **ID:** ${reminder.id}
          **Ends in:** ${endsAt}`;
      });
      const embed = new MessageEmbed()
        .setTitle(`Reminders for ${member.user.username}`)
        .setDescription(mappedReminders.join("\n\n"));
      message.send(embed);
    } catch (e) {
      console.log(e);
      message.reply("An unexpected error has occured!");
    }
  },
};
