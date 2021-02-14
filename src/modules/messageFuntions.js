const userModel = require("../models/userEco");
module.exports = async (msg) => {
  if (!msg.guild) return;
  const et = await msg.author.settings();
  if (et?.afk?.afk === true) await checkAfk(msg);
  if (msg.mentions.users.size) await afkMentioned(msg);
};

async function checkAfk(msg) {
  const message = await msg.channel
    .send(`**${msg.author.username}** Your afk has been removed`)
    .then(async (msg) => {
      msg
        .delete({ timeout: 10000, reason: "Andoi AFK Feature" })
        .catch(() => null);
      return await userModel.findOneAndUpdate({
        userID: msg.author.id,
        afk: { afk: false, reason: null },
      });
    });
}

async function afkMentioned(msg) {
  const mentioned = msg.mentions.users.first();

  const u = await mentioned.settings();
  const afkTime = u?.afk.afk;
  if (!afkTime) return;

  const afkReason = u?.afk.reason;
  return msg.send(
    `${msg.author}, **${mentioned.username}** Is currently afk for reason ${afkReason}`
  );
}
