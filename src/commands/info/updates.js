const { MessageEmbed } = require("discord.js");
const update = require("../../models/updates.js");
module.exports = {
  name: "updates",
  description: "Learn more about current and future updates.",
  category: "info",
  usage: "updates",
  run: async (client, message, args) => {
    const updates = await update
      .findOne({ name: "Andoi" })
      .catch((err) => console.log(err));
    console.log(updates);
    const embed = new MessageEmbed()
      .setTitle(`${updates.version}`)
      .setDescription(
        `new: ${updates.updates.new}\n fixed: ${updates.updates.fixed}\n removed: ${updates.updates.removed}`
      )
      .setColor("BLUE")
      .setTimestamp();
    message.send(embed);
  },
};
