const { readdirSync } = require("fs");
const { Collection } = require("discord.js");
module.exports = (client) => {
  // Read every commands subfolder
  readdirSync("./src/commands/").forEach((dir) => {
    // Filter so we only have .js command files
    const commands = readdirSync(`./src/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );

    // Loop over the commands, and add all of them to a collection
    // If there's no name found, prevent it from returning an error,
    // By using a cross in the table we made.
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);

      if (pull.name) {
        const cooldowns = client.cooldowns;

        if (!cooldowns.has(pull.name)) {
          cooldowns.set(pull.name, new Collection());
        }
        //Setting cliet.commands to the files' names
        client.commands.set(pull.name, pull);

        // If there's an aliases key, read the aliases.
        if (pull.aliases && Array.isArray(pull.aliases))
          pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      }
    }
    // Log the table
  });
};
