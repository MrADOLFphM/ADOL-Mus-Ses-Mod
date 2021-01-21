const ms = require("ms");
const muteDoc = require("../../models/mute");
module.exports = {
  name: "mute",
  description: "mute a user",
  category: "moderation",
  run: async (client, message, args) => {
    const e = await client.getConfig(message.guild);
    const mentionedMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    const msRegex = RegExp(/(\d+(s|m|h|w))/);
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You need manage roles permissions!");
    if (!message.member.me.hasPermission("MANAGE_ROLES"))
      //i wrote this for a special server
      return message.reply("I need manage roles permissions!");
    let muteRole = e.muteRole;
    if (!msRegex.test(args[1])) {
      return message.reply("That is not a valid time to mute a member!");
    }
    if (!muteRole) {
      return message.channel.send("Ask the owner to set the mute role!");
    }
    const mentionedPositions = mentionedMember.roles.highest.position;
    const memberPosition = message.member.roles.highest.position;
    const botPosition = message.guild.me.roles.highest.position;
    if (mentionedPositions >= botPosition) {
      return message.reply(
        "I can't mute this member as their role is higher/equal to mine!"
      );
    }
    if (muteRole.position >= botPosition) {
      return message.reply(
        `I can't mute this member as the \`${e.muteRole}\` role is higher/equal to mine!`
      );
    }
    const isMuted = await muteDoc.findOne({
      guildID: message.guild.id,
      memberID: mentionedMember.id,
    });

    if (isMuted) {
      return message.reply("This user is already muted!");
    }
    for (const channel of message.guild.channels.cache) {
      channel[1].updateOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
      });

      const noEveryone = mentionedMember.roles.cache.filter(
        (r) => r.name !== "@everyone"
      );
      await mentionedMember.roles.add(muteRole.id);

      for (const role of noEveryone) {
        await mentionedMember.roles.remove(role[0]);
      }
      let muteBe = new muteDoc({
        guildID: message.guild.id,
        memberID: mentionedMember.id,
        length: Date.now() + ms(msRegex.exec(args[1])[1]),
        memberRoles: noEveryone.map((r) => r),
      });
      await muteBe.save();
      const reason = args.slice(2).join(" ");
      message.channel.send(
        `muted ${mentionedMember} ${reason ? `for **${reason}**` : "None"}`
      );
      await client.emit(
        "modlog",
        message.guild,
        mentionedMember.user.username,
        "mute",
        reason || "None",
        message.member.user
      );
    }
  },
};
