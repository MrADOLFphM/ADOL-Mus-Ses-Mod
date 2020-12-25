const util = require("util");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "eval",
  description: "Eval",
  category: "owner",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const toEval = args.join(" ");
    if (!toEval) return message.channel.send("Please provide text");
    const type = typeof toEval;
    try {
      eval("(async () => { " + toEval + "})();").then((e) => {
        let evaluated = e;
        evaluated = util.inspect(evaluated, { depth: 0 });
        const embed = new MessageEmbed()
          .setTitle("Eval Command")
          .addField("**Input:**", `\`\`\`${toEval}\`\`\``)
          .addField("**Output:**", ` \`\`\`${evaluated}\`\`\``)
          .addField("**Type:**", ` \`\`\`${type}\`\`\``)
          .setColor("BLUE")
          .setTimestamp()
          .setFooter(message.author.username);

        message.channel.send(embed);
      });
    } catch (e) {
      return message.channel.send(`Something went wrong!  \`\`\`${e}\`\`\`  `);
    }
  },
};
