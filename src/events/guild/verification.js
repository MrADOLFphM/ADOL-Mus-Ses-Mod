module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    const captcha = client.utils.makeid(6);
    const mem = await client.getMember(member.guild, member);
    if (!mem) {
      client.createMember({
        guild: member.guild.id,
        member: member.id,
        captcha: captcha,
      });
    } else {
      mem.captcha = captcha;
      mem.save();
    }
    const gui = await member.guild.getConfig();
    const guild = await member.guild.getVerify();

    const verifier = guild?.type;

    if (["discrim", "captcha"].includes(verifier)) {
      const enabled = guild?.enabled;
      if (!enabled) return;
      const channel = guild?.channel;
      const role = guild?.role;
      if (enabled && channel && role) {
        try {
          const dm = await member.user.createDM();
          switch (verifier) {
            case "discrim": {
              await member.send(
                new MessageEmbed()
                  .setTimestamp()
                  .setColor(0xd3d3d3)
                  .setTitle(`Welcome to ${member.guild.name}`)
                  .setAuthor(
                    client.user.tag,
                    client.user.displayAvatarURL({ dynamic: true })
                  )
                  .setDescription(
                    `This server is protected by Andoi, a powerful bot that prevents servers from being raided\nTo get yourself verified use \`I am XXXX\`, where \`XXXX\` is your discriminator at ${member.guild.channels.resolve(
                      guild.channel
                    )}\nEg: \`I am ${member.user.discriminator}\``
                  )
              );
              break;
            }
            case "captcha": {
              await member.send(
                new MessageEmbed()
                  .setTimestamp()
                  .setColor(0xd3d3d3)
                  .setTitle(`Welcome to ${member.guild.name}`)
                  .setAuthor(
                    client.user.tag,
                    client.user.displayAvatarURL({ dynamic: true })
                  )
                  .setDescription(
                    `This server is protected by Andoi, a powerful bot that prevents servers from being raided\nTo get yourself verified use \`${
                      gui.prefix
                    }verify [Captcha]\` at ${member.guild.channels.resolve(
                      guild.channel
                    )}.\nEg: \`${
                      gui.prefix
                    }verify ${captcha}\`\n\nCaptcha: \`${captcha}\``
                  )
              );
              break;
            }
          }
          setTimeout(async () => {
            await member.fetch();
            if (!member.roles.cache.has(role) && member.kickable)
              await member.kick("Did not verified in 10 mins").catch(() => {});
          }, 60000 * 10);
        } catch (e) {}
      }
    }
  },
};
