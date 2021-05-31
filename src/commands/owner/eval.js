const util = require("util");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "eval",
  description: "Eval",
  category: "owner",
  aliases: ["e"],
  botOwnersOnly: true,
  run: async (client, message, args) => {
    try {
      const toEval = args.join(" ");
      if (!toEval) return message.channel.send("Please provide text");
      const time = Date.now();
      await eval("(async () =>  { " + toEval + " } )();").then((e) => {
        let evaluated = e;
        evaluated = util.inspect(evaluated, { depth: 0, maxArrayLength: null });
        const timeNow = Date.now();
        const type = typeof evaluated;
        const totaltime = timeNow - time;
        const embed = new MessageEmbed()
          .setTitle("Eval Command")
          .addField("**Input:**", `\`\`\`js\n${toEval}\`\`\``)
          .addField("**Output:**", ` \`\`\`js\n${evaluated}\`\`\``)
          .addField(
            "**Type:**",
            ` \`\`\`js\n${client.utils.firstUpperCase(type)}\`\`\``
          )
          .addField("**Time taken:**", `\`\`\`js\n${totaltime}ms\`\`\``)
          .setColor("BLUE")
          .setTimestamp()
          .setFooter(message.author.username);

        return message.channel.send(embed);
      });
    } catch (e) {
      return message.channel.send(`Something went wrong!  \`\`\`${e}\`\`\`  `);
    }
  },
};
