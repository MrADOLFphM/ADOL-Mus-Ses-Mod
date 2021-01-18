const {
  Client,
  Guild,
  GuildMember,
  Channel,
  Role,
  Collection,
} = require("discord.js");
const emotes = require("../JSON/emojis.json");
const { Player } = require("discord-player");
const filters = require("../JSON/filters.json");
const imdb = require("imdb-api");
const ItemManager = require("../modules/itemmanager");
module.exports = class AndoiClient extends (
  Client
) {
  constructor() {
    super({
      disableMentions: "everyone",
      partials: ["MESSAGE", "REACTION", "USER", "GUILD_MEMBER", "CHANNEL"],
    });
    const player = new Player(this, {
      leaveOnEmpty: true,
      autoSelfDeaf: true,
    });
    this.commands = new Collection();
    this.utils = require("../utils/functions");
    this.emotes = emotes;
    this.cooldowns = new Collection();
    this.aliases = new Collection();
    this.player = player;
    this.filters = filters;
    this.items = new ItemManager();
    this.snipes = new Map();
    this.config = require("../../config.json");
    this.imdb = new imdb.Client({ apiKey: this.config.imdbKey });
    require("../handlers/playerEvents")(this, this.player);
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
};
