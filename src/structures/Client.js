const {
  Guild,
  GuildMember,
  Channel,
  Role,
  Collection,
  Client,
} = require("discord.js");
const { MonitorStore, utils } = require("andoi-util");
const emotes = require("../JSON/emojis.json");
const { Player } = require("discord-player");
const filters = require("../JSON/filters.json");
const imdb = require("imdb-api");
const ItemManager = require("../modules/itemmanager");
const path = require("path");
const voteManager = require("./votes/voteManager");
const { performance } = require("perf_hooks");
module.exports = class AndoiClient extends (
  Client
) {
  constructor() {
    super({
      disableMentions: "everyone",
      partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    });
    const player = new Player(this, {
      leaveOnEmpty: true,
      autoSelfDeaf: true,
    });
    this.commands = new Collection();
    this.utils = require("../utils/functions");
    this.emotes = emotes;
    this.pieceStores = new Collection();
    this.version = require("../../package.json").version;
    this.cooldowns = new Collection();
    this.aliases = new Collection();
    this.player = player;
    this.filters = filters;
    this.items = new ItemManager();
    this.premium = [];
    this.snipes = new Map();
    this.config = require("../../config.json");
    this.imdb = new imdb.Client({ apiKey: this.config.imdbKey });
    this.monitors = new MonitorStore(this);
    this.registerStore(this.monitors);
    this.messages = { received: 0, sent: 0 };
    this.andoiUtils = utils;
    const coreDirectory = path.join(__dirname, "../");
    for (const store of this.pieceStores.values())
      store.registerCoreDirectory(coreDirectory);
    require("../handlers/playerEvents")(this, this.player);
    this.voteManager = new voteManager(this);
    this.voteManager.top_gg.webhook.on("vote", (vote) => {
      this.emit("vote", vote.user, vote.isWeekend, vote);
    });
    /**
     * Time took by the bot to start from loading files to the first `READY` state
     * @type {?Number}
     */
    this.bootTime = null;
    this.on("message", (message) => {
      if (message.author.id === this.user.id) {
        return this.messages.sent++;
      } else {
        return this.messages.received++;
      }
    });
    this.once("ready", () => {
      this.bootTime = Math.round(performance.now());
      return;
    });
  }

  registerStore(store) {
    this.pieceStores.set(store.name, store);
    return this;
  }
  async resolveUser(search) {
    if (!search || typeof search !== "string") return null;
    let user = null;
    if (search.match(/^<@!?(\d+)>$/))
      user = await this.users
        .fetch(search.match(/^<@!?(\d+)>$/)[1])
        .catch(() => {});
    if (search.match(/^!?(\w+)#(\d+)$/) && !user)
      user = this.users.cache.find(
        (u) =>
          u.username === search.match(/^!?(\w+)#(\d+)$/)[0] &&
          u.discriminator === search.match(/^!?(\w+)#(\d+)$/)[1]
      );
    if (search.match(/.{2,32}/) && !user)
      user = this.users.cache.find((u) => u.username === search);
    if (!user) user = await this.users.fetch(search).catch(() => {});
    return user;
  }
  /**
   * @returns {Promise<GuildMember>|null}
   * @param {string} search
   * @param {Guild} guild
   */
  async resolveMember(search, guild) {
    if (!search || typeof search !== "string") return null;
    const user = await this.resolveUser(search);
    if (!user) return null;
    return await guild.members.fetch(user);
  }
  /**
   * @returns {Role|null}
   * @param {string} search
   * @param {Guild} guild
   */
  resolveRole(search, guild) {
    if (!search || typeof search !== "string") return null;
    let role = null;
    if (search.match(/^<@&!?(\d+)>$/))
      role = guild.roles.cache.get(search.match(/^<@&!?(\d+)>$/)[1]);
    if (!role) role = guild.roles.cache.find((r) => r.name === search);
    if (!role) role = guild.roles.cache.get(search);
    return role;
  }
  /**
   * @returns {Channel|null}
   * @param {string} search
   * @param {Guild} guild
   */
  resolveChannel(search, guild) {
    if (!search) return null;
    let channel = null;
    channel = guild.channels.cache.get(
      search.replace("<", "").replace("#", "").replace(">", "")
    );
    if (!channel) channel = guild.channels.cache.find((c) => c.name === search);
    if (!channel) channel = guild.channels.cache.get(search);
    return channel;
  }
  getEmoji(name) {
    return this.emojis.cache.get((n) => n === name);
  }
  shuffle(obj) {
    if (!obj) return null;
    if (Array.isArray(obj)) {
      let i = obj.length;
      while (i) {
        let j = Math.floor(Math.random() * i);
        let t = obj[--i];
        obj[i] = obj[j];
        obj[j] = t;
      }
      return obj;
    }
    if (typeof obj === "string") return this.shuffle(obj.split("")).join("");
    return obj;
  }
  async start() {
    super.login(this.config.Token);
    const { init } = require("../utils/mongoose");
    init();
  }
  shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
  }
};
