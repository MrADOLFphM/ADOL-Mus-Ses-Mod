module.exports = async (client) => {
  let { commands } = client;
  //made by Raccoon#7867
  let categories = [];

  let docs =
    "# Bot-12 Command List\n> :heart: Command list generated [here](https://github.com/Tovade/Andoi/blob/main/scripts/updateDocs.js)\n";

  commands.forEach((command) => {
    if (!categories.includes(command.category)) {
      categories.push(command.category);
    }
  });

  categories.forEach((cat) => {
    const tCommands = commands.filter((cmd) => cmd.category === cat);
    docs += `
            \n
### ${cat} [${tCommands.size}] 
| Name | Description | 
| ---- | ----------- | 
${tCommands
  .map((command) => {
    return `| [${command.name}](https://github.com/Tovade/Andoi/blob/master/docs/commands.md#${command.name}) | ${command.description} | `;
  })
  .join("\n")}\n\n`;
  });

  docs += "# Detailed Command List";

  categories.forEach((cat) => {
    const tCommands = commands.filter((cmd) => cmd.category === cat);

    docs += `
## ${cat} | ${tCommands.size} Commands
${tCommands
  .map((command) => {
    return `
### ${command.name.toProperCase()}
Command: ${command.name}\n
Category: ${command.category}\n
Description: ${command.description}\n
Usage: ${command.usage || "No usage"}\n
Aliases: ${command.aliases ? command.aliases.join(", ") : "No aliases"}\n
[Back to top](https://github.com/Tovade/Andoi/blob/master/docs/commands.md#Andoi-command-list)`;
  })
  .join("\n\n")}`;
  });

  const fs = require("fs");
  if (fs.existsSync("./docs/commands.md")) {
    fs.writeFileSync("./docs/commands.md", docs.trim());
    console.log("Commands updated");
  }
};
