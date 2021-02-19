const { MessageEmbed } = require("discord.js");
const Invite =
  "https://discord.com/api/oauth2/authorize?client_id=728694375739162685&permissions=0&scope=bot";
const categories = require("../../JSON/categories.json");
const { owners } = require("../../../config.json");
const paginate = require("../../modules/paginate");
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
    const customCmds = !e.custom[0]
      ? [{ category: "custom", name: "None" }]
      : e.custom.map((cmd) => {
          return { name: cmd.name, category: "custom" };
        });

    const commands = [
      ...client.commands.array(),
      ...disabledCmds,
      ...customCmds,
    ];
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
        .addField(
          "Usage",
          "`" + command.usage ? command.usage : "Not provided" + "`"
        )
        .addField(
          "aliases",
          command.aliases ? "`" + command.aliases + "`" : "not provided"
        )
        .addField("cooldown", command.cooldown ? command.cooldown : "None");
      embed
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      //prefix variable is prefix

      const embeds = [];

      const categories = client.commands
        .map((c) => c.category)
        .reduce((a, b) => {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, [])
        .sort();
      for (const category of categories) {
        let commands = client.commands.filter(
          (c) => c.category.toLowerCase() === category.toLowerCase()
        );

        commands = commands.filter((c) => c.name).map((c) => `\`${c.name}\``);
        let emx = new MessageEmbed()
          .setTitle(`Viewing category: ${client.emotes[category]} ${category}`)
          .setColor("GREEN")
          .addField(
            "need support?",
            `[Join our support server](https://discord.gg/jqm4Ybh) | [or invite me](${Invite})`
          )
          .setThumbnail(client.user.displayAvatarURL());
        emx.addField(category, `${commands.sort().join(", ")}`);
        embeds.push(emx);
      }
      await paginate(message, embeds);
    }
  },
};
