const AndoiClient = require("./structures/Client");
const { GiveawaysManager } = require("discord-giveaways");
require("./extenders/Guild");
require("./extenders/Message");
require("./extenders/User");
const client = new AndoiClient();
client.start();

const { Collection, MessageEmbed } = require("discord.js");
const { Database } = require("quickmongo");
require("./utils/user")(client);
require("./utils/client")(client);
require("./utils/member")(client);
const { sendErrorLog } = require("./utils/functions");
require("./utils/config.js")(client);
Array.prototype.last = function () {
  return this[this.length - 1];
};

global.client = client;
global.botIntl = Intl.DateTimeFormat("en", {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/New_York",
  hour12: true,
  timeZoneName: "short",
});
// Create a new instance of your new class
const manager = new GiveawaysManager(client, {
  hasGuildMembersIntent: true,
  storage: "./src/giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    embedColor: "#7289DA",
    botsCanWin: false,
    reaction: "🎉",
    embedColorEnd: "#7289DA",
  },
});
client.giveawaysManager = manager;
manager.on("giveawayEnded", (giveaway, winners) => {
  winners.forEach((member) => {
    member.send(
      "Congratulations, " +
        member.user.username +
        ", you won: " +
        giveaway.prize
    );
  });
});
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

require("./handlers/event")(client);
process.on("unhandledRejection", (error) =>
  sendErrorLog(client, error, "error")
);

process.on("uncaughtExceptionMonitor", (error) =>
  sendErrorLog(client, error, "error")
);
process.on("warning", (warning) => sendErrorLog(client, warning, "warning"));
