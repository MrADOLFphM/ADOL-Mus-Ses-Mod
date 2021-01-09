module.exports = {
  name: "togglelevel",
  category: "levels",
  memberPermission: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send("Usage: `togglelevel <system/notif>`");
    const reference = message.guild.cache.levelconfig
      ? message.guild.levelconfig
      : await message.guild.getLevelConfig();
    switch (args[0]) {
      case "notif":
        await message.guild.changeLevelConfig(
          "levelnotif",
          !reference.levelnotif
        );
        await message.channel.send(
          `Now the level-up notifications are: ${
            !reference.levelnotif ? "Enabled" : "Disabled"
          }`
        );
        break;
      case "system":
        await message.guild.changeLevelConfig(
          "levelsystem",
          !reference.levelsystem
        );
        await message.channel.send(
          `Now the level system is: ${
            !reference.levelsystem ? "Enabled" : "Disabled"
          }`
        );
        break;
      default:
        await message.channel.send("Invalid mode!");
    }
  },
};
