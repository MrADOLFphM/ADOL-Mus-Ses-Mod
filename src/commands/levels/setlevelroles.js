const MessageModel = require("../../models/levelconfig");
module.exports = {
  name: "setlevelroles",
  category: "levels",
  memberPermission: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        "Usage: `setlevelroles add <level> <roles> / setlevelroles remove <level>`"
      );
    const mode = args[0];
    if (mode !== "add" && mode !== "remove")
      return message.channel.send("Invalid mode!");
    if (!args[1]) return message.channel.send("Put a level!");
    if (isNaN(args[1])) return message.channel.send("Invalid level!");
    if (mode === "add" && !args[2])
      return message.channel.send(
        "Put the roles to be delivered when the level is reached"
      );

    const add = async (leve, toadd) => {
      const level = parseInt(leve);
      if (!level) return;
      if (level < 1) return message.channel.send("Invalid number");
      const msgDocument = await MessageModel.findOne({
        guildId: message.guild.id,
      });
      if (msgDocument) {
        const { roles } = msgDocument;
        roles[level - 1] = toadd;
        await msgDocument
          .updateOne({ roles: roles })
          .then(async () => {
            message.guild.cache.levelconfig = false;
            await message.channel.send("Updated");
          })
          .catch((err) => message.channel.send("Some error ocurred! " + err));
      } else {
        const arr = [];
        arr[level - 1] = toadd;
        await new MessageModel({
          guildId: message.guild.id,
          levelnotif: false,
          levelsystem: false,
          roles: arr,
        })
          .save()
          .then(async () => {
            message.guild.cache.levelconfig = false;
            await message.channel.send("Updated");
          })
          .catch((err) => message.channel.send("Some error ocurred! " + err));
      }
    };
    const remove = async (leve) => {
      const level = parseInt(leve);
      if (!level) return;
      if (level < 1) return message.channel.send("Invalid number");
      const msgDocument = await MessageModel.findOne({
        guildId: message.guild.id,
      });
      if (!msgDocument) {
        await message.channel.send("There are no records of that level");
        await new MessageModel({
          guildId: message.guild.id,
          levelnotif: false,
          levelsystem: false,
          roles: [],
        })
          .save()
          .then(async () => {
            message.guild.cache.levelconfig = false;
            await message.channel.send("Updated");
          })
          .catch((err) => message.channel.send("Some error ocurred! " + err));
      } else {
        const { roles } = msgDocument;
        if (!roles[level - 1])
          return message.channel.send("There are no records of that level");
        roles[level - 1] = undefined;
        await msgDocument
          .updateOne({ roles: roles })
          .then(async () => {
            message.guild.cache.levelconfig = false;
            await message.channel.send("Updated");
          })
          .catch((err) => message.channel.send("Some error ocurred! " + err));
      }
    };

    if (mode === "add") {
      const roles = message.mentions.roles.first()
        ? message.mentions.roles.map((e) => e.id)
        : args.slice(2);
      if (!roles.every((e) => message.guild.roles.cache.has(e)))
        return message.channel.send("Invalid roles!");
      await add(args[1], roles);
    } else if (mode === "remove") {
      await remove(args[1]);
    }
  },
};
