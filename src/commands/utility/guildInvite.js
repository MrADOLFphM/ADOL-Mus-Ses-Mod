module.exports = {
  name: "guildinvite",
  description: "Creates an invite for the server",
  aliases: ["serverinvite"],
  category: "utility",
  run: async (client, message, args) => {
    const invite = await message.channel.createInvite();

    return message.channel.send(`https://discord.gg/${invite.code}`);
  },
};
