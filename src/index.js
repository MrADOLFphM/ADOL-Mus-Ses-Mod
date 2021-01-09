const { imdbKey, dblkey } = require("../config.json");
const imdb = require("imdb-api");
const Discord = require("discord.js");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { addUserMoney } = require("./utils/economy");
const fs = require("fs");
const token = require(`../config.json`);
const { MessageEmbed } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
require("./extenders/Guild");
require("./extenders/Message");
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
});
client.setMaxListeners(20);

require("./utils/user")(client);
const { Player } = require("discord-player");
const emotes = require("./JSON/emojis.json");
const { init } = require("./utils/mongoose");
const filters = require("./JSON/filters.json");
const player = new Player(client);
const ItemManager = require("./modules/itemmanager");
require("./utils/client")(client);
init();
const { sendErrorLog } = require("./utils/functions");
require("./utils/config.js")(client);
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
if (dblkey && dblkey.length !== 0) {
  const d = require("dblapi.js");
  const dbl = new d(
    dblkey,
    { webhookAuth: "AndoiBot", webhookServer: server },
    client
  );
  dbl.webhook.on("ready", (hook) => {
    console.log(`Webhook is running on ${hook}`);
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
  client.on("ready", () => {
    setInterval(() => {
      dbl.postStats(client.guilds.size);
    }, 1800000);
  });
}

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
player

  // Send a message when a track starts
  .on("trackStart", (message, track) =>
    message.channel.send(`Now playing ${track.title}...`)
  )

  // Send a message when something is added to the queue
  .on("trackAdd", (message, queue, track) =>
    message.channel.send(`${track.title} has been added to the queue!`)
  )
  .on("playlistAdd", (message, queue, playlist) =>
    message.channel.send(
      `${playlist.title} has been added to the queue (${playlist.items.length} songs)!`
    )
  )

  // Send messages to format search results
  .on("searchResults", (message, query, tracks) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Here are your search results for ${query}!`)
      .setDescription(tracks.map((t, i) => `${i + 1}. ${t.title}`))
      .setFooter("Send the number of the song you want to play!");
    message.channel.send(embed);
  })
  .on("searchInvalidResponse", (message, query, tracks, content, collector) =>
    message.channel.send(
      `You must send a valid number between 1 and ${tracks.length}!`
    )
  )
  .on("searchCancel", (message, query, tracks) =>
    message.channel.send(
      "You did not provide a valid response... Please send the command again!"
    )
  )
  .on("noResults", (message, query) =>
    message.channel.send(`No results found on YouTube for ${query}!`)
  )

  // Send a message when the music is stopped
  .on("queueEnd", (message, queue) =>
    message.channel.send(
      "Music stopped as there is no more music in the queue!"
    )
  )
  .on("channelEmpty", (message, queue) =>
    message.channel.send(
      "Music stopped as there is no more member in the voice channel!"
    )
  )
  .on("botDisconnect", (message) =>
    message.channel.send(
      "Music stopped as I have been disconnected from the channel!"
    )
  )

  // Error handling
  .on("error", (error, message) => {
    switch (error) {
      case "NotPlaying":
        message.channel.send("There is no music being played on this server!");
        break;
      case "NotConnected":
        message.channel.send("You are not connected in any voice channel!");
        break;
      case "UnableToJoin":
        message.channel.send(
          "I am not able to join your voice channel, please check my permissions!"
        );
        break;
      default:
        message.channel.send(`Something went wrong... Error: ${error}`);
    }
  });
server.listen(25635);
