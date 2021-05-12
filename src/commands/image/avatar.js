module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "image",
  description: "Shows Avatar",
  usage: "[username | nickname | mention | ID](optional)",
  run: async (bot, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        (r) =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        (r) =>
          r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;
    const webp = user.user.displayAvatarURL({ type: "webp", dynamic: true });
    const png = user.user.displayAvatarURL({ type: "png", dynamic: true });
    const jpg = user.user.displayAvatarURL({ type: "jpg", dynamic: true });
    if (args[0]) {
      message.channel.send({
        embed: {
          title: `${user.user.username}'s Avatar`,

          color: 0xffefd5,
          description: `[PNG](${png}) | [JPG](${jpg}) | [WEBP](${webp})`,

          image: {
            url: png,
          },

          timestamp: new Date(),

          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL(),
          },
        },
      });
    } else if (!args[0]) {
      message.channel.send({
        embed: {
          title: `${user.user.username}'s Avatar`,

          color: 0xffefd5,
          description: `[PNG](${png}) | [JPG](${jpg}) | [WEBP](${webp})`,

          image: {
            url: png,
          },

          timestamp: new Date(),

          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL(),
          },
        },
      });
    }
  },
};
