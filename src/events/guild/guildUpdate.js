const logBed = require("../../utils/logBed");
module.exports = {
  name: "guildUpdate",
  async execute(client, oldGuild, newGuild) {
    if (!newGuild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await newGuild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    if (oldGuild.premiumTier < newGuild.premiumTier) {
      const e = logBed(client)
        .setTitle("The server went a boost level up!")
        .setDescription(
          `This server is now on boost level ${newGuild.premiumTier}!`
        );
      webhook.send(e);
    }
    if (oldGuild.premiumTier > newGuild.premiumTier) {
      const e = logBed(client)
        .setTitle("The server went a boost level down!")
        .setDescription(
          `This server is now on boost level ${newGuild.premiumTier}!`
        );
      webhook.send(e);
    }
    if (oldGuild.region !== newGuild.region) {
      const e = logBed(client)
        .setTitle("The server region was changed!")
        .setDescription(`The region is now ${newGuild.region}!`);
      webhook.send(e);
    }
    if (!oldGuild.banner && newGuild.banner) {
      const e = logBed(client)
        .setTitle("The server banner was made!")
        .setDescription(`The banner is ${newGuild.banner}!`);
      webhook.send(e);
    }
    if (oldGuild.banner !== newGuild.banner) {
      const e = logBed(client)
        .setTitle("The server banner was changed!")
        .setDescription(`The banner is now ${newGuild.banner}!`);
      webhook.send(e);
    }
    if (!oldGuild.afkChannel && newGuild.afkChannel) {
      const e = logBed(client)
        .setTitle("The server afk channel was added!")
        .setDescription(`The afk channel is now ${newGuild.afkChannel.name}!`);
      webhook.send(e);
    }
    if (oldGuild.afkChannel !== newGuild.afkChannel) {
      const e = logBed(client)
        .setTitle("The server afk channel was changed!")
        .setDescription(`The afk channel is now ${newGuild.afkChannel.name}!`);
      webhook.send(e);
    }
    if (!oldGuild.vanityURLCode && newGuild.vanityURLCode) {
      const e = logBed(client)
        .setTitle("The server vanity url code was added!")
        .setDescription(`The vanity url code is ${newGuild.vanityURLCode}!`);
      webhook.send(e);
    }
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
      const e = logBed(client)
        .setTitle("The server vanity url code was changed!")
        .setDescription(
          `The vanity url code is now  ${newGuild.vanityURLCode}!`
        );
      webhook.send(e);
    }
    if (oldGuild.name !== newGuild.name) {
      const e = logBed(client)
        .setTitle("The server name was changed!")
        .setDescription(`The server name is now  ${newGuild.name}!`);
      webhook.send(e);
    }
  },
};
