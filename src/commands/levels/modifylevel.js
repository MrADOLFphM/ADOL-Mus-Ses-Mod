const Levels = require("../../modules/discord-xp");
module.exports = {
  name: "modifylevel",
  category: "levels",
  memberPermission: ["MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    const msgDocument = message.guild.cache.levelconfig
      ? message.guild.levelconfig
      : await message.guild.getLevelConfig();
    if (!msgDocument || (msgDocument && !msgDocument.levelsystem))
      return message.channel.send(
        "The levels on this server are disabled! Use `togglelevel system` to enable the system!"
      );
    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      (await (args[0]
        ? await message.guild.members.fetch(args[0]).catch(() => {})
        : undefined));
    if (target) {
      if (target.user.bot)
        return message.reply(
          "why do you want to configure the level of a bot?"
        );
      const waiting = await Levels.fetch(target.id, message.guild.id);
      if (!waiting) {
        Levels.createUser(target.id, message.guild.id);
        return message.reply("That user isn't on my database");
      }
      switch (args[1]) {
        case "subtract":
          {
            if (!args[2]) return message.reply("specify a amount");
            const num1 = parseInt(args[1]);
            if (!num1) return message.reply("invalid number!");
            if (num1 < 0) return message.reply("invalid number!");
            await Levels.subtractXp(target.id, message.guild.id, num1)
              .then(() =>
                message.channel.send(
                  `Ok, I've subtracted ${num1}xp from ${target.user.tag}.`
                )
              )
              .catch((err) =>
                message.channel.send(
                  "Some error ocurred! Here's a debug: " + err
                )
              );
          }
          break;
        case "subtractlevel":
          {
            if (!args[2]) return message.reply("specify a amount");
            const num2 = parseInt(args[1]);
            if (!num2) return message.reply("invalid number!");
            if (num2 < 0) return message.reply("invalid number!");
            await Levels.subtractLevel(target.id, message.guild.id, num2)
              .then(() =>
                message.channel.send(
                  `Ok, I've lowered ${num2} levels to ${target.user.tag}.`
                )
              )
              .catch((err) =>
                message.channel.send(
                  "Some error ocurred! Here's a debug: " + err
                )
              );
          }
          break;
        case "setlevel":
          {
            if (!args[2]) return message.reply("specify a amount");
            const num3 = parseInt(args[2]);
            if (typeof num3 !== "number" && !num3)
              return message.reply("invalid number!");
            if (num3 < 0) return message.reply("invalid number!");
            await Levels.setLevel(target.id, message.guild.id, num3)
              .then(() =>
                message.channel.send(
                  `Ok, I've put ${target.user.tag} on level ${num3}`
                )
              )
              .catch((err) =>
                message.channel.send(
                  "Some error ocurred! Here's a debug: " + err
                )
              );
          }
          break;
        case "appendlevel":
          {
            if (!args[2]) return message.reply("specify a amount");
            const num4 = parseInt(args[2]);
            if (!num4) return message.reply("invalid number!");
            if (num4 < 0) return message.reply("invalid number!");
            await Levels.appendLevel(target.id, message.guild.id, num4)
              .then(() =>
                message.channel.send(
                  `Ok, I've increased ${num4} levels to ${target.user.tag}`
                )
              )
              .catch((err) =>
                message.channel.send(
                  "Some error ocurred! Here's a debug: " + err
                )
              );
          }
          break;
        case "appendxp":
          {
            if (!args[2]) return message.reply("specify a amount");
            const num5 = parseInt(args[2]);
            if (!num5) return message.reply("invalid number!");
            if (num5 < 0) return message.reply("invalid number!");
            await Levels.appendXp(target.id, message.guild.id, num5)
              .then(() =>
                message.channel.send(
                  `Ok, I've increased ${num5}xp to ${target.user.tag}`
                )
              )
              .catch((err) =>
                message.channel.send(
                  "Some error ocurred! Here's a debug: " + err
                )
              );
          }
          break;
        case "setxp":
          {
            if (!args[2]) return message.reply("specify a amount");
            const num6 = parseInt(args[2]);
            if (typeof num6 !== "number" && !num6)
              return message.reply("invalid number!");
            if (num6 < 0) return message.reply("invalid number!");
            await Levels.setXp(target.id, message.guild.id, num6)
              .then(() =>
                message.channel.send(
                  `Ok, I've put ${target.user.tag}'s XP to ${num6}xp`
                )
              )
              .catch((err) =>
                message.channel.send(
                  "Some error ocurred! Here's a debug: " + err
                )
              );
          }
          break;
        case "delete":
          await Levels.deleteUser(args[0], message.guild.id)
            .then(() =>
              message.channel.send(
                `Ok, I've removed that user from my database.`
              )
            )
            .catch((err) =>
              message.channel.send("Some error ocurred! Here's a debug: " + err)
            );
          break;
        default:
          await message.reply(
            "valid options: `subtract, subtractlevel, setlevel, appendlevel, appendxp, delete`"
          );
          break;
      }
    } else {
      if (args[0] === "delete") {
        Levels.deleteUser(args[0], message.guild.id)
          .then(() =>
            message.channel.send(`Ok, I've removed that user from my database.`)
          )
          .catch((err) =>
            message.channel.send("Some error ocurred! Here's a debug: " + err)
          );
      } else if (args[0] && target) {
        message.reply(
          "valid options: `subtract, subtractlevel, setlevel, appendlevel, appendxp, delete`"
        );
      } else if (!args[0]) {
        message.reply(
          "valid options: `subtract, subtractlevel, setlevel, appendlevel, appendxp, delete`"
        );
      } else if (args[0] || !target) {
        message.reply("Invalid user!");
      }
    }
  },
};
