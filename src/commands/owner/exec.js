const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "exec",
  description: "Eval",
  category: "owner",
  aliases: ["ex"],
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const code = args.join(" ");
    if (!code) return message.send("Bruh no code??");

    await client.andoiUtils.exec(code, (error, stdout) => {
      let response = error || stdout;
      message.sendCode("js", response);
    });
  },
};
