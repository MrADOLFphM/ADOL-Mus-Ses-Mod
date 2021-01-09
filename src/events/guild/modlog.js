const modlog = require("../../structures/modlog");
module.exports = {
  name: "modlog",
  async execute(client, guild, channel, member, reason, type, moderator) {
    console.log(moderator);
    const m = new modlog(guild);
    m.setType(type);
    m.setModerator(moderator);
    m.setReason(reason);
    m.setUser(member.user);
    await m.send();
  },
};
