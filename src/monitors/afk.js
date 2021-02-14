module.exports.run = async (msg) => {
  if (!msg.guild || !msg.channel || !msg.channel.postable) return;
  const et = await msg.author.settings();
  if (et.afk.afk) await checkAfk(msg);
  if (msg.mentions.users.size) await afkMentioned(msg);
};

async function checkAfk(msg) {
  const message = msg.channel.send(
    `**${msg.author.username}** Your afk has been removed`
  );
  return message
    .delete({ timeout: 10000, reason: "Andoi AFK Feature" })
    .catch(() => null);
}

async function afkMentioned(msg) {
  const mentioned = msg.mentions.users.first();

  const u = await mentioned.settings();
  const afkTime = u.afk.afk;
  if (!afkTime) return;

  const afkReason = u.afk.reason;
  return msg.send(
    `${msg.author}, **${mentioned.username}** Is currently afk for reason ${afkReason}`
  );
}
