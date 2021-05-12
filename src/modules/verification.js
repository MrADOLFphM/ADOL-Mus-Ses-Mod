const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  try {
    const mdb = await message.guild.getConfig();
    const db = await message.guild.getVerify();
    const mem = await client.getMember(message.guild, message.member);
    if (!db?.enabled || !db?.role || !db?.channel || !db?.type) return false;
    const channel_id = db?.channel;
    const type = db?.type;
    const role = db?.role;
    const enabled = db?.enabled;
    if (!enabled || !role || !channel_id) return false;
    if (channel_id !== message.channel.id) return false;
    if (message.deletable) message.delete().catch(() => {});
    if (type === "react") return false;
    let verified = false;
    if (type === "discrim") {
      verified = message.content === `I am ${message.author.discriminator}`;
    } else if (type === "captcha") {
      const cptcha = mem.captcha;
      verified = message.content === `${mdb.prefix}verify ${cptcha}`;
    }
    if (!verified) return false;
    message.channel
      .send(
        new MessageEmbed()
          .setColor(0x00ff00)
          .setTimestamp()
          .setDescription(`<@${message.author.id}>, you have been verified!`)
      )
      .then((m) => {
        m.delete().catch(() => {});
        if (!message.member.roles.cache.has(role))
          message.member.roles.add(role).catch(() => {});
        return true;
      })
      .catch(() => {});
  } catch (e) {
    return false;
  }
};
