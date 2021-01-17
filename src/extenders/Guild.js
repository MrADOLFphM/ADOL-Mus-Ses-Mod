const { Structures } = require("discord.js");
const level = require("../models/levelconfig.js");
const Config = require("../models/config");
const verify = require("../models/verify");
Structures.extend("Guild", (Guild) => {
  return class extends Guild {
    constructor(client, data) {
      super(client, data);
      this.levelconfig = {};
      this.cache = {
        levelconfig: false,
      };
    }
    async getLevelConfig() {
      const doc = await level.findOne({ guildId: this.id });
      if (doc) {
        this.levelconfig = doc;
        this.cache.levelconfig = true;
        return doc;
      } else {
        (this.levelconfig = {}), (this.cache.levelconfig = true);
        return {};
      }
    }
    async changeLevelConfig(config, value) {
      if (typeof value !== "boolean") return false;
      const doc = await level.findOne({ guildId: this.id });
      if (doc) {
        if (config === "levelnotif") {
          doc.levelnotif = value;
          await doc.save();
          this.levelconfig = doc;
          this.cache.levelconfig = true;
          return true;
        } else if (config === "levelsystem") {
          doc.levelsystem = value;
          await doc.save();
          this.levelconfig = doc;
          this.cache.levelconfig = true;
          return true;
        } else return false;
      } else {
        const esto = await level.create({
          guildId: this.id,
          levelnotif: config === "levelnotif" ? value : false,
          levelsystem: config === "levelsystem" ? value : false,
          roles: [],
        });
        this.levelconfig = esto;
        this.cache.levelconfig = true;
        return true;
      }
    }
    async getConfig() {
      let data = await Config.findOne({ GuildID: this.id }).catch((err) =>
        console.log(err)
      );
      return data;
    }
    async updateConfig(settings) {
      let data = await this.getConfig(this);
      if (typeof data != "object") data = {};
      for (const key in settings) {
        if (settings.hasOwnProperty(key)) {
          if (data[key] != settings[key]) data[key] = settings[key];
          else return;
        }
      }
      return await data.updateOne(settings).catch((err) => console.log(err));
    }
    async getLang() {
      try {
        const guild = await this.getConfig();

        const e = require(`../locales/${guild?.lan || "english"}`);
        if (e) return e;
        if (!e) return require("../locales/english");
      } catch (e) {
        console.error(e);
      }
    }
    async getVerify() {
      let data = await verify
        .findOne({ guild_id: this.id })
        .catch((err) => console.log(err));
      return data;
    }
    createVerify(settings) {
      let data = new verify(settings);
      data.save();
      return data;
    }
  };
});
