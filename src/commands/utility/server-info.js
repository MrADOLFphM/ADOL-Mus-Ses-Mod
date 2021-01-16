const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "serverinfo",
  category: "utility",
  aliases: ["si"],
  description: "Get Info About The Server.",
  usage: "serverinfo",
  async run(client, message, args) {
    const lang = await message.getLang();
    const { guild } = message;
    const {
      name,
      memberCount,
      premiumSubscriptionCount,
      premiumTier,
      verified,
      partnered,
    } = guild;
    const roles = client.utils.formatNumber(guild.roles.cache.size);
    const channels = client.utils.formatNumber(guild.channels.cache.size);
    const emojis = client.utils.formatNumber(guild.emojis.cache.size);
    const createdAt = global.botIntl.format(guild.createdAt);
    const boosts = premiumSubscriptionCount;
    const boostLevel = premiumTier;
    const owner = (guild.owner && guild.owner.user.tag) || "error";
    const isVerified = verified
      ? lang.GUILD.IS_VERIFIED
      : lang.GUILD.NOT_VERIFIED;
    const isPartnered = partnered
      ? lang.GUILD.IS_PARTNERED
      : lang.GUILD.NOT_PARTNERED;
    const inviteBanner = guild.bannerURL({
      size: 2048,
      format: "png",
      dynamic: true,
    });

    const region = guild.region;

    const verLevel = guild.verificationLevel;
    const mfaLevel = guild.mfaLevel;

    const embed = new MessageEmbed()
      .setTitle(name)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .addField(`**${lang.GUILD.OWNER}**`, owner, true)
      .addField(`**${lang.GUILD.ROLES_C}**`, roles, true)
      .addField(`**${lang.GUILD.CHANNEL_C}**`, channels, true)
      .addField(`**${lang.GUILD.CREATED}**`, createdAt, true)
      .addField(`**${lang.GUILD.EMOJI_C}**`, emojis, true)
      .addField(`**${lang.GUILD.MEMBER_C}**`, memberCount, true)
      .addField(`**${lang.GUILD.REGION}**`, region, true)
      .addField(`**${lang.GUILD.VERIFICATION}**`, verLevel, true)
      .addField(`**${lang.GUILD.MFA}**`, mfaLevel, true)
      .addField(`**${lang.GUILD.BOOSTS}**`, boosts, true)
      .addField(`**${lang.GUILD.BOOST_LVL}**`, boostLevel, true)
      .addField(`**${lang.GUILD.VERIFIED}**`, isVerified, true)
      .addField(`**${lang.GUILD.PARTNERED}**`, isPartnered, true)
      .setImage(inviteBanner);

    message.channel.send(embed);
  },
};
