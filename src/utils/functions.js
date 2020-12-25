const { MessageEmbed } = require("discord.js");

const yes = ["yes", "y", "ye", "yea", "correct"];
const no = ["no", "n", "nah", "nope", "fuck off"];
const errorLogsChannelId = "749358808337481811";
async function verify(
  channel,
  user,
  { time = 30000, extraYes = [], extraNo = [] } = {}
) {
  const filter = (res) => {
    const value = res.content.toLowerCase();
    return (
      (user ? res.author.id === user.id : true) &&
      (yes.includes(value) ||
        no.includes(value) ||
        extraYes.includes(value) ||
        extraNo.includes(value))
    );
  };
  const verify = await channel.awaitMessages(filter, {
    max: 1,
    time,
  });
  if (!verify.size) return 0;
  const choice = verify.first().content.toLowerCase();
  if (yes.includes(choice) || extraYes.includes(choice)) return true;
  if (no.includes(choice) || extraNo.includes(choice)) return false;
  return false;
}
function sendErrorLog(bot, error, type, msgContent) {
  const message = {
    author: bot.user,
  };

  const name = error.name || "N/A";
  const code = error.code || "N/A";
  const httpStatus = error.httpStatus || "N/A";
  const stack = error.stack || "N/A";
  const content = msgContent || "N/A";

  const embed = new MessageEmbed()
    .setTitle("An error occurred")
    .addField("Name", name, true)
    .addField("Code", code, true)
    .addField("httpStatus", httpStatus, true)
    .addField("Command executed", content, true)
    .setDescription(`\`\`\`${stack}\`\`\` `)
    .setColor(type === "error" ? "RED" : "ORANGE");

  bot.channels.cache.get(errorLogsChannelId)?.send(embed);
}
function list(arr, conj = "and") {
  const len = arr.length;
  if (len === 0) return "";
  if (len === 1) return arr[0];
  return `${arr.slice(0, -1).join(", ")}${
    len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""
  }${arr.slice(-1)}`;
}
async function promptMessage(message, author, time, validReactions) {
  time *= 1000;

  for (const reaction of validReactions) await message.react(reaction);

  const filter = (reaction, user) =>
    validReactions.includes(reaction.emoji.name) && user.id === author.id;

  return message
    .awaitReactions(filter, { max: 1, time: time })
    .then((collected) => collected.first() && collected.first().emoji.name);
}
function wrapText(ctx, text, maxWidth) {
  return new Promise((resolve) => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText("W").width > maxWidth) return resolve(null);
    const words = text.split(" ");
    const lines = [];
    let line = "";
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) {
          words[1] = `${temp.slice(-1)}${words[1]}`;
        } else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
        line += `${words.shift()} `;
      } else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = {
  verify,
  list,
  delay,
  promptMessage,
  wrapText,
  sendErrorLog,
};
