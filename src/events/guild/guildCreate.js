const { MessageEmbed } = require("discord.js");
const storeModel = require("../../models/store");

module.exports = {
  name: "guildCreate",
  async execute(client, guild) {
    const LogBed = new MessageEmbed()
      .setTitle(`New server ${guild.name} here is some info!`)
      .addField("Owner", guild.owner.user.tag)
      .addField("MemberCount", guild.memberCount)
      .addField("Name", guild.name)
      .addField("ID", guild.id)
      .setColor("RED");
    const w = await client.guilds.cache
      .get("740295580886106233")
      .fetchWebhooks();
    const webhook = w.find((w) => w.name === "Guild log");
    webhook.send(LogBed);

    const newConfig = {
      GuildID: guild.id,
      prefix: "a!",
    };
    await client.createConfig(newConfig).catch((err) => console.log(err));
    await new storeModel({ GuildID: guild.id });
    guild.members.cache.forEach(async (m) => {
      if (await hasProfile(client, m)) return;
      await client.createUser({
        userID: m.user.id,
      });
    });
  },
};

async function hasProfile(client, m) {
  const check = await client.getUser(m.user);
  if (!check) return false;
  if (check) return true;
}
