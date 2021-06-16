const { oneLine } = require("common-tags");
const Discord = require("discord.js");
const moment = require("moment");

const serverflags = {
  DISCORD_EMPLOYEE: `  \`Discord Employee\``,
  DISCORD_PARTNER: ` \`Discord Partner\``,
  BUGHUNTER_LEVEL_1: ` \`Bug Hunter (Level 1)\``,
  BUGHUNTER_LEVEL_2: `\`Bug Hunter (Level 2)\``,
  HYPESQUAD_EVENTS: ` \`HypeSquad Events\``,
  HOUSE_BRAVERY: ` \`House of Bravery\``,
  HOUSE_BRILLIANCE: ` \`House of Brilliance\``,
  HOUSE_BALANCE: ` \`House of Balance\``,
  EARLY_SUPPORTER: `\`Early Supporter\``,
  TEAM_USER: `\`Team User\``,
  SYSTEM: `\`System\``,
  VERIFIED_BOT: ` \`Verified Bot\``,
  VERIFIED_DEVELOPER: ` \`Verified Bot Developer\``,
};
const st = {
  online: " Online",
  idle: "Idle",
  offline: " Offline",
  dnd: " Do Not Disturb",
};

module.exports = {
  name: "userinfo",
  description: "Shows the info about an user account",
  category: "utility",
  usage: "info",
  aliases: ["whois", "ui"],
  run: async (client, message, args) => {
    const member = await client.findMember(message, args, true);

    const nickname = member.nickname || "*None*";
    const discriminator = member.user.discriminator || "*None*";

    const createdAt = moment.utc(member.user.createdAt).calendar();
    const lp = moment.utc(member.user.createdAt).fromNow();
    const joinedAt = moment.utc(member.joinedAt).calendar();
    const lap = moment.utc(member.joinedAt).fromNow();

    let userFlags = (await member.user.fetchFlags())
      .toArray()
      .map((flag) => serverflags[flag]);
    if (!userFlags || !userFlags.length) userFlags = "*None*";

    const avatar =
      member.user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 4096,
      }) || "*None*";

    const bot = member.user.bot ? "Yes" : "No";

    const activities =
      member.user.presence.activities.length === 0
        ? {
            status: "*None*",
            other: [],
          }
        : member.user.presence.activities.reduce(
            (activities, activity) => {
              switch (activity.type) {
                case "CUSTOM_STATUS":
                  activities.status = `${
                    activity.emoji ? `${activity.emoji} | ` : ""
                  }${activity.state}`;
                  break;
                case "PLAYING":
                  activities.other.push(`${activity.type} ${activity.name}`);
                  break;
                case "LISTENING":
                  if (activity.name === "Spotify" && activity.assets) {
                    activities.other.push(
                      `${activity.details} by ${activity.state}`
                    );
                  }
                  break;
                default:
                  activities.other.push(activity.type);
              }

              return activities;
            },
            {
              status: "*None*",
              other: [],
            }
          );

    const roles = member.roles.cache.array().length
      ? member.roles.cache
          .array()
          .filter((role) => role.name !== "@everyone")
          .join(", ")
      : "*None*";
    const highestRole = member.roles.highest || "*None*";
    const hoistRole = member.roles.hoist || "*None*";
    let status = st[member.presence.status];

    const embed = new Discord.MessageEmbed()
      .setTitle(member.user.tag)
      .setURL(avatar)
      .setThumbnail(avatar)
      .setColor("RANDOM")
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()
      .addFields(
        {
          name: "Nickname",
          value: nickname,
          inline: true,
        },
        {
          name: "#️Discriminator",
          value: discriminator,
          inline: true,
        },
        {
          name: "Build",
          value: `${createdAt} | ${lp}`,
          inline: false,
        },
        {
          name: "Joined",
          value: `${joinedAt} | ${lap}`,
          inline: true,
        },
        {
          name: "Badges",
          value: userFlags,
          inline: false,
        },
        {
          name: "Bot",
          value: bot,
          inline: true,
        },
        {
          name: "Custom Status",
          value: activities.status,
          inline: true,
        },
        {
          name: " Status",
          value: `${status}`,
          inline: true,
        },
        {
          name: "🥇Highest Role",
          value: highestRole || "None",
          inline: true,
        },
        {
          name: "Hoist Role",
          value: hoistRole || "None",
          inline: true,
        },
        {
          name: " Activities",
          value:
            activities.other && activities.other.length
              ? activities.other.join("\n")
              : "*None*",
          inline: true,
        },
        {
          name: ` Roles (${member.roles.cache.size - 1})`,
          value: roles || "None",
          inline: true,
        }
      );

    message.channel.send(embed);
  },
};
