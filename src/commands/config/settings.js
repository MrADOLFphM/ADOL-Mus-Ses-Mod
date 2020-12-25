const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "settings",
  description: "Show the config!",
  category: "config",
  run: async (client, message, args) => {
    const guild = await client.getConfig(message.guild);
    const welcomeChannel =
      message.guild.channels.cache.get(guild.welcomeChannel) || "None";
    const leaveChannel =
      message.guild.channels.cache.get(guild.leaveChannel) || "None";
    const autoRole = message.guild.roles.cache.get(guild.autoRole) || "None";
    const muteRole = message.guild.roles.cache.get(guild.muteRole) || "None";
    const suggestChannel =
      message.guild.channels.cache.get(guild.suggestChan) || "None";
    const levelMessages = guild.levelMessage;
    const prefix = guild.prefix;
    const embed = new MessageEmbed()
      .setTitle(`Settings for ${message.guild.name}`)
      .addField("Welcome channel", welcomeChannel)
      .addField("Leave channel", leaveChannel)
      .addField("Auto role", autoRole)
      .addField("Mute role", muteRole)
      .addField("Suggest channel", suggestChannel)
      .addField("Level messages", levelMessages)
      .addField("Prefix", prefix)
      .addField("Disabled categorys", guild.disabled.join(", ") || "None")
      .addField("Disabled commands", guild.commands.join(", ") || "None");
    message.channel.send(embed);
  },
};
