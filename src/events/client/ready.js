const botModel = require("../../models/bot");
const autoCovid = require("../../helpers/autoCovid");
module.exports = {
  name: "ready",
  async execute(client) {
    console.log(`
    ░█████╗░███╗░░██╗██████╗░░█████╗░██╗
    ██╔══██╗████╗░██║██╔══██╗██╔══██╗██║
    ███████║██╔██╗██║██║░░██║██║░░██║██║
    ██╔══██║██║╚████║██║░░██║██║░░██║██║
    ██║░░██║██║░╚███║██████╔╝╚█████╔╝██║
    ╚═╝░░╚═╝╚═╝░░╚══╝╚═════╝░░╚════╝░╚═╝`);
    client.voteManager.init(true);
    const vot = await botModel.findOne({ name: "Andoi" });
    if (!vot) {
      new botModel({
        name: "Andoi",
      }).save();

      return console.log("Created botmodel as there was no bot model found");
    }
    await botModel.findOneAndUpdate({ name: "Andoi", commandssincerestart: 0 });
    setInterval(() => {
      const statuses = [
        `a!help || ${client.utils.formatNumber(
          client.guilds.cache.size
        )} servers.`,
        `a!help || ${client.channels.cache.size} channels`,
        `a!help || ${client.users.cache.size} users`,
        `a!help || ${client.commands.size} commands`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "WATCHING" });
    }, 60000);
    console.log(
      `Loaded ${client.utils.formatNumber(client.commands.size)} commands`
    );
    const bot = client.user.username;
    const icon = client.emotes.success;
    const servers = client.utils.formatNumber(client.guilds.cache.size);
    const members = client.utils.formatNumber(
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)
    );
    require("../../helpers/pingChecker")(client);
    if (!client.config.dev) {
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
    for (const guild of client.guilds.cache) {
      setInterval(async () => {
        await autoCovid(client, guild.id);
      }, 43200000);
      const chan = vot?.channel;
      const ms = vot?.lastMsg;
      if (!ms) return;
      if (!chan) return;
      try {
        const msg = await client.channels.cache.get(chan).messages.fetch(ms);
        msg.edit("restarted succesfully");
      } catch (err) {
        return;
      }
    }
  },
};
