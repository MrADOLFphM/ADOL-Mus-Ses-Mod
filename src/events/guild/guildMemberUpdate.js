const logBed = require("../../utils/logBed");

module.exports = {
  name: "guildMemberUpdate",
  async execute(client, newMember, oldMember) {
    if (!newMember.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await newMember.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    if (!oldMember.guild) return;
    const avatar = newMember.user.displayAvatarURL({ dynamic: true });

    const embed = logBed(client)
      .setAuthor(`${newMember.user.tag}`, avatar)
      .setTimestamp()
      .setColor("ORANGE");

    if (oldMember.nickname !== newMember.nickname) {
      const oldNickname = oldMember.nickname || "`None`";
      const newNickname = newMember.nickname || "`None`";
      embed
        .setTitle("Member Update: `Nickname`")
        .setDescription(`${newMember}'s **nickname** was changed.`)
        .addField("Nickname", `${newNickname} ➔ ${oldNickname}`);

      webhook.send(embed);
    }

    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      const role = newMember.roles.cache
        .difference(oldMember.roles.cache)
        .first();
      embed
        .setTitle("Member Update: `Role Add`")
        .setDescription(`${newMember} was **given** the ${role} role.`);

      webhook.send(embed);
    }

    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      const role = oldMember.roles.cache
        .difference(newMember.roles.cache)
        .first();
      embed
        .setTitle("Member Update: `Role Remove`")
        .setDescription(`${newMember} was **removed** from ${role} role.`);
      webhook.send(embed);
    }
    if (!oldMember.premiumSince && newMember.premiumSince) {
      embed
        .setTitle("Member Update: `Boosting`")
        .setDescription(
          `${client.emotes.boost}${newMember.user.username} Started boosting!`
        );
      webhook.send(embed);
    }
    if (oldMember.premiumSince && !newMember.premiumSince) {
      embed
        .setTitle("Member Update: `Unboost`")
        .setDescription(
          `${client.emotes.boost}${newMember.user.username} has stopped boosting!`
        );
      webhook.send(embed);
    }
  },
};
