module.exports = {
  name: "guildMemberAdd",
  execute(client, member) {
    const conf = member.guild.getConfig();
    let autoRole = conf?.autoRole;
    if (autoRole === null || !autoRole) return;
    if (autoRole) {
      member.roles.add(autoRole.id);
    }
  },
};
