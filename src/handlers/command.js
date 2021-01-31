const glob = require("glob");
const { Collection } = require("discord.js");
const path = require("path");
module.exports = (client) => {
  const commandFiles = glob.sync("./src/commands/**/**/*.js");
  for (const file of commandFiles) {
    const command = require(path.resolve(file));
    client.commands.set(command.name, command);
    client.categories.set(command.name, command.category);
    if (command.aliases && Array.isArray(command.aliases))
      command.aliases.forEach((alias) =>
        client.aliases.set(alias, command.name)
      );
    const cooldowns = client.cooldowns;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }
  }
};
