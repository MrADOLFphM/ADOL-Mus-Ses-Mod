const ReactionsModel = require("../../models/reactionrole.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "rradd",
  description: "Add a reaction role",
  category: "reactions",
  usage: "?rradd <channel id> <role id> <emoji>",
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("no");
    }
    let emojis;
    let roles;
    const [channelId] = args;
    const { guild } = message;
    const filter = (m) => message.author.id === m.author.id;

    if (!channelId) {
      return message.channel.send("Provide a channel id please!");
    }

    message.channel.send(
      "Please send your roles by id below, separate by space. E.G.: 389730847098379087 9876096987980987 7867869876689766"
    );

    const roleMsgs = await message.channel.awaitMessages(filter, {
      time: 600000,
      max: 1,
      errors: ["time"],
    });
    const roleMsg = roleMsgs.first();
    roles = parseRoles(roleMsg, guild);

    message.channel.send(
      "Please send your emojis below. The order will match with the order of the roles. Separate with a space"
    );

    const emojiMsgs = await message.channel.awaitMessages(filter, {
      time: 600000,
      max: 1,
      errors: ["time"],
    });
    const emojiMsg = emojiMsgs.first();
    emojis = parseEmojis(emojiMsg);

    const channel = guild.channels.cache.get(channelId);
    if (!channel) {
      return message.channel.send("channel not found!");
    }

    const embed = new MessageEmbed()
      .setTitle("Andoi reaction roles!")
      .setDescription(
        `React to get a role!\n ${createDescription(roles, emojis)}`
      );

    const msg = await channel.send(embed);

    emojis.forEach((em) => {
      msg.react(em);
    });

    const reactions = [];

    for (let i = 0; i < roles.length; i++) {
      reactions.push({ role_id: roles[i].id, emoji: emojis[i].toString() });
    }

    const newRR = new ReactionsModel({
      guild_id: guild.id,
      message_id: msg.id,
      reactions: reactions,
      channel_id: channelId,
    });

    newRR.save();

    return message.channel.send("Succes!");
  },
};

function createDescription(roles, emojis) {
  const strings = [];

  for (let i = 0; i < roles.length; i++) {
    strings.push(`${emojis[i]}: ${roles[i]}`);
  }

  return strings.join("\n");
}

function parseRoles(msg, guild) {
  const content = msg.content.trim().split(/ +/g);

  // Remove any duplicates
  const filtered = [...new Set(content)];

  let roles = [];

  filtered.forEach(async (roleId) => {
    const role =
      guild.roles.cache.get(roleId) || (await guild.roles.fetch(roleId));

    roles = [...roles, role];
    return role;
  });

  return roles;
}

function parseEmojis(msg) {
  let content = msg.content.trim().split(/ +/g);

  content = content.filter((s) => {
    // Remove custom emojis
    if (s.split(":").length === 1 ? false : true) {
      return false;
    }
    return true;
  });

  return [...new Set(content)];
}
