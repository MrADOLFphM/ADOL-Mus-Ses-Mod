const { MessageEmbed } = require("discord.js");
const Invite =
  "https://discord.com/api/oauth2/authorize?client_id=728694375739162685&permissions=0&scope=bot";
const categories = require("../../JSON/categories.json");
const { owners } = require("../../../config.json");
module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    const e = await client.getConfig(message.guild);
    const prefix = e.prefix;
    const isBotOwner = owners.includes(message.author.id);
    const disabledCmds = !e.commands[0]
      ? [{ category: "disabled", name: "None" }]
      : e.commands.map((cmd) => {
          return { name: cmd, category: "disabled" };
        });
    const commands = [...client.commands.array(), ...disabledCmds];
    if (args[0] && categories.includes(args[0])) {
      const cmds = commands
        .filter(({ category }) => category === args[0].toLowerCase())
        .map(({ name }) => name)
        .join(", ");
      if (cmds.length < 0)
        return message.channel.send("There is no category with this name");
      const le = new MessageEmbed().setTitle(`${args[0]}`);
      if (args[0] === "owner") {
        if (isBotOwner) {
          le.setDescription(`\`\`\`${cmds}\`\`\``);
        } else {
          le.setDescription("Only for owners ¯_(ツ)_/¯");
        }
      } else {
        le.setDescription(`\`\`\`${cmds}\`\`\``);
      }
      message.channel.send(le);
    } else if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .addField(
          "aliases",
          command.aliases ? "`" + command.aliases + "`" : "not provided"
        )
        .addField("cooldown", command.cooldown ? command.cooldown : "None");
      if (command.options.size !== 0) {
        embed.addField(`Options:`, command.options.join(", "));
      }
      embed
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      //prefix variable is prefix
      let emx = new MessageEmbed()
        .setDescription("these are my commands")
        .setColor("GREEN")
        .setFooter(`do ${prefix}help <command name> for more info.`)
        .addField(
          "need support?",
          `[Join our support server](https://discord.gg/jqm4Ybh) | [or invite me](${Invite})`
        )
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "```" + value.join(", ") + "```";
        if (["nsfw"].includes(category) && !message.channel.nsfw) {
          emx.addField(`NSFW`, "Channel is not nsfw");
        } else if (category === "owner" && !isBotOwner) {
          emx.addField(category.toLowerCase(), "Only for owners");
        } else {
          emx.addField(category.toLowerCase(), desc);
        }
      }
      return message.channel.send(emx);
    }
  },
};
