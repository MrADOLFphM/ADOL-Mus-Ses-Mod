const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "afk",
  aliases: ["setafk"],
  category: "utility",
  description: "",
  run: async (client, message, args) => {
    const lang = await message.guild.getLang();
    const user = await client.getUser(message.author);
    if (user.afk.afk) {
      await client.updateUser(message.author, {
        afk: { afk: false, reason: null },
      });
      return message.send("Your no longer afk");
    }

    let reason = args.join(" ");

    let options = {
      reason: `${reason || lang.NONE}`,
      afk: true,
    };
    await client.updateUser(message.author, {
      afk: { afk: true, reason: options.reason },
    });

    const embed = new MessageEmbed()
      .setTimestamp()
      .setDescription(
        lang.MAIN.NOW_AFK.replace('{reason || "AFK"}', reason || options.reason)
      )
      .setColor("BLUE");

    message.channel.send(embed);

    if (message.member.nickname) {
      if (!message.member.nickname.includes("[AFK] ")) {
        message.member.setNickname(`[AFK] ${message.member.nickname}`);
      }
    } else {
      message.member.setNickname(`[AFK] ${message.author.username}`);
    }
  },
};
