const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mdb = await message.guild.getConfig();
      const db = await message.guild.getVerify();
      const mem = await message.member.getMember();
      const channel_id = db.channel;
      const type = db.type;
      const role = db.role;
      const enabled = db.enabled;
      const stat = !enabled || !role || !channel_id ? true : false;
      if (stat || channel_id !== message.channel.id) return resolve(false);
      if (message.deletable) message.delete({ timeout: 1000 }).catch(() => {});
      if (type === "react") return resolve(false);
      let verified = false;
      if (type === "discrim") {
        verified = message.content === `I am ${message.author.discriminator}`;
      } else if (type === "captcha") {
        const cptcha = mem.captcha;
        verified = message.content === `${mdb.prefix}verify ${cptcha}`;
      }
      if (!verified) return;
      message.channel
        .send(
          new MessageEmbed()
            .setColor(0x00ff00)
            .setTimestamp()
            .setDescription(`<@${message.author.id}>, you have been verified!`)
        )
        .then((m) => {
          m.delete({ timeout: 5000 }).catch(() => {});
          if (!message.member.roles.cache.has(role))
            message.member.roles.add(role).catch(() => {});
          resolve(true);
        })
        .catch(() => {});
    } catch (e) {
      reject(e);
    }
  });
};
