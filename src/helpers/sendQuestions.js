const hasApplied = require("../models/application/applied");
const { MessageEmbed } = require("discord.js");
module.exports = async (client, message, author, model) => {
  const filter = (res) => res.author.id === author.id;
  let ApplicationResponse = "";
  const awaitReply = async (question, filter, limit = 60000) => {
    let e = new MessageEmbed().setDescription(question).setColor("RANDOM");
    const m = await message.author.send(e);

    return m.channel
      .awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
      .then((collected) => collected.first().content)
      .catch(() => false);
  };
  for await (const question of model.questions) {
    const response = await awaitReply(`${question}`, filter, 60000 * 30);
    if (!response || response.toLowerCase() === `cancel`) {
      ApplicationResponse = "cancel";
      break;
    }
    ApplicationResponse += `> ${question}\n${response}\n\n`;
  }
  if (ApplicationResponse === "cancel") {
    await author.send("Interview has been cancelled.");
    return true;
  }
  const copy = ApplicationResponse;
  const content = chunkString(copy, 2048);
  await message.author.send("Your application is now pending!");
  const db = new hasApplied({
    guildID: message.guild.id,
    userID: author.id,
    appID: generateToken(),
    hasApplied: true,
  });
  await db.save();
  const ch = await client.channels.cache.get(model.appLogs);
  await ch.send(
    new MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(
        `Approve or decline by doing \`a!approve ${db.appID}\` or \`a!decline ${db.appID}\``
      )
      .setAuthor(
        `${message.author.tag}'s staff application`,
        message.author.displayAvatarURL() || null
      )
  );
  for await (const text of content) {
    await ch.send(new MessageEmbed().setColor("RANDOM").setDescription(text));
  }
};
function chunkString(str, length) {
  return str.match(new RegExp(`(.|[\r\n]){1,${length}}`, "g"));
}
function generateToken() {
  var length = 6,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
