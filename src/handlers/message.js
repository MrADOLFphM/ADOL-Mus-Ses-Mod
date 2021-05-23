const Levels = require("../modules/discord-xp");
const { Canvas } = require("canvas-constructor");
const Discord = require("discord.js");
const timer = new Discord.Collection();

const handleLevel = async (message, nolevel = false) => {
  if (!nolevel) {
    const msgDocument2 = message.guild.levelconfig
      ? await message.guild.getLevelConfig()
      : null;
    if (msgDocument2 && msgDocument2.levelsystem) {
      if (!timer.get(message.author.id)) {
        timer.set(message.author.id, true);
        setTimeout(() => {
          timer.delete(message.author.id);
        }, 30000);
        const randomAmountOfXp = Math.floor(Math.random() * 100) + 1; // Min 1, Max 10
        const hasLeveledUp = await Levels.appendXp(
          message.author.id,
          message.guild.id,
          randomAmountOfXp
        );
        if (hasLeveledUp) {
          const user = await Levels.fetch(message.author.id, message.guild.id);
          const { roles } = msgDocument2;
          if (roles[user.level - 1]) {
            const toadd = roles[user.level].filter(
              (e) =>
                message.guild.roles.cache.has(e) &&
                message.guild.roles.cache.get(e).editable &&
                !message.guild.roles.cache.get(e).managed
            );
            message.member.roles.add(toadd);
          }
        }
        if (hasLeveledUp && msgDocument2.levelnotif) {
          const user = await Levels.fetch(message.author.id, message.guild.id);
          const plate = await fsn.readFile("./assets/images/level_up.png");
          const username = message.author.username.substr(0, 30);
          const body = message.author.displayAvatarURL({ format: "png" });
          const e = new Canvas(640, 360)
            .addImage(plate, 0, 0, 640, 360)
            .setTextFont("23px Srisakdi")
            .setTextAlign("center")
            .addText(username, 350, 60)
            .setTextFont("26px Srisakdi")
            .setTextAlign("center")
            .addText(user.level, 456, 201)
            .setTextFont("26px Srisakdi")
            .setTextAlign("center")
            .addText(user.xp + "/" + user.level * 400, 426, 271)
            .addImage(body, 58, 80, 200, 200, { type: "round", radius: 100 })
            .resetTransformation()
            .toBuffer();

          message.channel.send({
            files: [
              {
                attachment: e,
                name: "level_up.png",
              },
            ],
          });
        }
      }
    }
  }
};
module.exports = {
  handleLevel,
};
