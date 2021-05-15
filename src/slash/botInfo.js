const { version } = require("discord.js");
const choices = [
  {
    name: "Guild count",
    value: "guild-count",
    return: (client) =>
      `${client.utils.formatNumber(bot.guilds.cache.size)} Servers`,
  },
  {
    name: "User count",
    value: "user-count",
    return: (client) => {
      const userCount = client.utils.formatNumber(
        client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
      );

      return `${client.utils.formatNumber(userCount)} Users`;
    },
  },
  {
    name: "Channel count",
    value: "channel-count",
    return: (client) => {
      return `${client.utils.formatNumber(
        client.channels.cache.size
      )} Channels`;
    },
  },
  {
    name: "Command count",
    value: "command-count",
    return: (client) => {
      return `${client.utils.formatNumber(client.commands.size)} Commands`;
    },
  },
  {
    name: "Memory Usage",
    value: "memory",
    return: (_) => {
      return `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )}MB Ram`;
    },
  },
  {
    name: "Nodejs version",
    value: "uptime",
    return: () => process.version,
  },
  {
    name: "Discord.js version",
    value: "djs-version",
    return: () => version,
  },
];
module.exports = {
  name: "botinfo",
  description: "Return a piece of information about the bot",
  options: [
    {
      name: "option",
      type: "STRING",
      description: "Return a piece of information about the bot",
      required: true,
      choices: choices.map((choice) => ({
        value: choice.value,
        name: choice.name,
      })),
    },
  ],
  async execute(client, interaction, args) {
    const choice = choices.find((ch) => ch.value === args[0]);
    if (!choice) {
      return interaction.reply("Not a valid option!", { ephemeral: true });
    }
    return interaction.reply(choice.return(client));
  },
};
