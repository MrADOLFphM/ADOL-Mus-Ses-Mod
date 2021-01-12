const { imdbKey } = require("../config.json");
const imdb = require("imdb-api");
const Discord = require("discord.js");

const token = require(`../config.json`);
const { GiveawaysManager } = require("discord-giveaways");
require("./extenders/Guild");
require("./extenders/Message");
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
});
client.setMaxListeners(50);

require("./utils/user")(client);
const { Player } = require("discord-player");
const emotes = require("./JSON/emojis.json");
const { init } = require("./utils/mongoose");
const filters = require("./JSON/filters.json");
const player = new Player(client, {
  leaveOnEmpty: true,
  autoSelfDeaf: true,
});
const ItemManager = require("./modules/itemmanager");
require("./utils/client")(client);
init();
const { sendErrorLog } = require("./utils/functions");
require("./utils/config.js")(client);
require("./handlers/playerEvents")(client, player);
const check = client.emojis.cache.find((emoji) => emoji.name === "andoiCheck");
const cross = client.emojis.cache.find((emoji) => emoji.name === "andoiCross");
const utils = require("./utils/functions");

client.cross = cross;
client.check = check;
client.items = new ItemManager();
client.emotes = emotes;
client.filters = filters;
client.player = player;
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();
client.phone = new Discord.Collection();
client.utils = utils;
client.queue = new Map();
client.snipes = new Map();
client.afk = new Map();
client.imdb = new imdb.Client({ apiKey: imdbKey });
client.config = require("../config.json");

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
client.login(token.Token);
