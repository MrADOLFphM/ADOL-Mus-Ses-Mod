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

    if (client.config.dblkey.length === 0) {
      message.channel.send("Your gay");
      throw new Error("Nothing");
    }
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
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
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
      let emx = new MessageEmbed()
        .setDescription("these are my commands")
        .setColor("GREEN")
        .setFooter(`do ${prefix}help <command name> for more info.`)
        .addField(
          "need support?",
          `[Join our support server](https://discord.gg/jqm4Ybh) | [or invite me](${Invite})`
        )
        .setThumbnail(client.user.displayAvatarURL());

      const utilCmds = commands
        .filter(({ category }) => category === "utility")
        .map(({ name }) => name)
        .join(", ");
      const configCmds = commands
        .filter(({ category }) => category === "config")
        .map(({ name }) => name)
        .join(", ");
      const funCmds = commands
        .filter(({ category }) => category === "fun")
        .map(({ name }) => name)
        .join(", ");
      const infoCmds = commands
        .filter(({ category }) => category === "info")
        .map(({ name }) => name)
        .join(", ");
      const musicCmds = commands
        .filter(({ category }) => category === "music")
        .map(({ name }) => name)
        .join(", ");
      const levelCmds = commands
        .filter(({ category }) => category === "levels")
        .map(({ name }) => name)
        .join(", ");
      const ownerCmds = commands
        .filter(({ category }) => category === "owner")
        .map(({ name }) => name)
        .join(", ");
      const ticketCmds = commands
        .filter(({ category }) => category === "tickets")
        .map(({ name }) => name)
        .join(", ");
      const modCms = commands
        .filter(({ category }) => category === "moderation")
        .map(({ name }) => name)
        .join(", ");
      const searchCmds = commands
        .filter(({ category }) => category === "search")
        .map(({ name }) => name)
        .join(", ");
      const rrCmd = commands
        .filter(({ category }) => category === "reactions")
        .map(({ name }) => name)
        .join(", ");
      const imageCmds = commands
        .filter(({ category }) => category === "image")
        .map(({ name }) => name)
        .join(", ");
      const gameCmds = commands
        .filter(({ category }) => category === "games")
        .map(({ name }) => name)
        .join(", ");
      const giveCmds = commands
        .filter(({ category }) => category === "giveaway")
        .map(({ name }) => name)
        .join(", ");
      const animalCmds = commands
        .filter(({ category }) => category === "animal")
        .map(({ name }) => name)
        .join(", ");
      const ecoCmds = commands
        .filter(({ category }) => category === "economy")
        .map(({ name }) => name)
        .join(", ");
      const dis = commands
        .filter(({ category }) => category === "disabled")
        .map(({ name }) => name)
        .join(", ");
      const cus = commands
        .filter(({ category }) => category === "custom")
        .map(({ name }) => name)
        .join(", ");
      emx
        .addField(`${client.emotes.config}Config`, `\`${configCmds}\``)
        .addField(`${client.emotes.info}Info`, `\`${infoCmds}\``)
        .addField(`${client.emotes.fun}Fun`, `\`${funCmds}\``);
      if (!isBotOwner) {
        emx.addField(
          `${client.emotes.owner}Owner`,
          `Ownly viewable by the owner!`
        );
      } else {
        emx.addField(`${client.emotes.owner}Owner`, `\`${ownerCmds}\``);
      }
      emx
        .addField(`${client.emotes.levels}Levels`, `\`${levelCmds}\``)
        .addField(`${client.emotes.music}Music`, `\`${musicCmds}\``)
        .addField(`${client.emotes.utility}Utility`, `\`${utilCmds}\``)
        .addField(`${client.emotes.economy}Economy`, `\`${ecoCmds}\``)
        .addField(`${client.emotes.moderation}Moderation`, `\`${modCms}\``)
        .addField(`${client.emotes.ticket}Ticket`, `\`${ticketCmds}\``)
        .addField(`${client.emotes.search}Searching`, `\`${searchCmds}\``)
        .addField(`${client.emotes.games}Games`, `\`${gameCmds}\``)
        .addField(`${client.emotes.image}Image`, `\`${imageCmds}\``)
        .addField(`${client.emotes.giveaway}Giveaway`, `\`${giveCmds}\``)
        .addField(`${client.emotes.reaction}Reactions`, `\`${rrCmd}\``)
        .addField(`${client.emotes.animal}Animal`, `\`${animalCmds}\``)
        .addField(`${client.emotes.disabled}Disabled`, `\`${dis || "None"}\``)
        .addField(`${client.emotes.custom}Custom`, `\`${cus}\``);
      return message.channel.send(emx);
    }
  },
};
