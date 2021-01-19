const { MessageEmbed } = require("discord.js");
const { addUserMoney } = require("../utils/economy");
const { dblkey } = require("../../config.json");
module.exports = async (client) => {
  const d = require("dblapi.js");
  const dbl = new d(dblkey, { webhookAuth: "AndoiBot" }, client);
  client.on("ready", () => {
    setInterval(() => {
      dbl.postStats(client.guilds.cache.size);
    }, 1800000);
  });
  dbl.webhook.on("ready", (hook) => {
    console.log(`Webhook is running on ${hook.path}`);
  });

  dbl.webhook.on("vote", async (vote) => {
    let eeeeeeee = {
      false: 1000,
      true: 2000,
    };
    const user =
      client.users.cache.get((u) => u.id === vote.user) ||
      (await client.users.fetch(vote.user));
    const ee = new MessageEmbed()
      .setTitle(`${user.username} Thanks for voting!`)
      .setDescription(
        `You got ${eeeeeeee[vote.isWeekend]} coins and unlocked 2 commands!`
      );
    await client.channels.cache.get("790923255250419722").send(ee);
    if (vote.isWeekend === false) {
      await addUserMoney(user.id, 1000);
    } else {
      await addUserMoney(user.id, 2000);
    }
  });
  server.listen(25635);
};
