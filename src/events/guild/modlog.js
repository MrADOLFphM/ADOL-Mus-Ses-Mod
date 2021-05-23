const modlog = require("../../structures/modlog");
module.exports = {
  name: "modlog",
  async execute(client, guild, member, reason, type, moderator) {
    const m = new modlog(guild);
    m.setType(type);
    m.setModerator(moderator);
    if (!reason) reason = "None";
    m.setReason(reason);
    if (member) {
      m.setUser(member);
    }
    await m.send();
  },
};
