module.exports = (client) => {
    if (!client.config.dev) {
        const bot = client.user.username;
        const icon = client.emotes.success;
        const servers = client.utils.formatNumber(client.guilds.cache.size);
        const members = client.utils.formatNumber(
          client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
        );
        const commands = client.commands.size;
        const boot = client.bootTime;
        const message = `${icon} \`[ ${client.version} ]\` **REBOOT**`;
        const embed = {
          color: "GREY",
          description: [
            "```properties",
            `Servers: ${servers}`,
            `Members: ${members}`,
            `Command: ${commands}`,
            `Boot: ${boot}ms`,
            "```",
          ].join("\n"),
        };
  
        await client.channels.cache
          .get("803706448784785488")
          ?.createWebhook(bot, {
            avatar: client.user.displayAvatarURL({
              format: "png",
              dynamic: true,
              size: 128,
            }),
          })
          .then((webhook) =>
            Promise.all([webhook.send(message, { embeds: [embed] }), webhook])
          )
          .then(([_, webhook]) => webhook.delete())
          .catch(() => {});
      }
}