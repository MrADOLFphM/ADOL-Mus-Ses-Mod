const { MessageEmbed } = require("discord.js");
const { addUserMoney } = require("../../utils/economy");
module.exports = {
  name: "vote",
  async execute(client, user, weekend, vote) {
    let eeeeeeee = {
      false: 1000,
      true: 2000,
    };
    const userl =
      client.users.cache.get((u) => u.id === user) ||
      (await client.users.fetch(user));
    const ee = new MessageEmbed()
      .setTitle(`${userl.username} Thanks for voting!`)
      .setDescription(
        `You got ${eeeeeeee[weekend]} coins and unlocked 2 commands!`
      );
    await client.channels.cache.get("790923255250419722").send(ee);
    if (weekend === false) {
      await addUserMoney(userl.id, 1000);
    } else {
      await addUserMoney(userl.id, 2000);
    }
  },
};
