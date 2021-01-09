const { Structures, APIMessage } = require("discord.js");
module.exports = Structures.extend(
  "Message",
  (Message) =>
    class AndoiMessage extends Message {
      constructor(...args) {
        super(...args);
        // Last response sent if any, for editing.
        this.lastResponse = null;
        // The used alias to invoke the command.
        this.alias = null;
        // Content with --flags removed.
        this.parsedContent = null;
        // Command arguments.
        this.args = [];
        // The invoked command.
        this.command = null;
        // Prefix used to invoke the command.
        // Parsed --flags
        this.commandFlags = {};
      }
      async send(content, options) {
        const transformedOptions = APIMessage.transformOptions(
          content,
          options
        );

        // Condition 1: Attachments cannot be edited.
        if ("files" in transformedOptions)
          return this.channel.send(transformedOptions);

        // When editing always remove the previous content/embed
        if (!transformedOptions.content) transformedOptions.content = null;
        if (!transformedOptions.embed) transformedOptions.embed = null;

        // Condition 2: A last response is available and we can edit it.
        if (
          this.lastResponse &&
          !this.lastResponse.deleted &&
          !this.lastResponse.attachments.size
        ) {
          return this.lastResponse.edit(transformedOptions);
        }

        // Condition 4: No previous reply to edit. Send a reply and save it.
        const sent = await this.channel.send(transformedOptions);

        // Store the response for editing.
        this.lastResponse = Array.isArray(sent) ? sent.slice(-1)[0] : sent;

        return sent;
      }
      async awaitReply(question, filter, limit = 60000) {
        await this.channel.send(question);

        return this.channel
          .awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
          .then((collected) => collected.first().content)
          .catch(() => false);
      }
      async awaitReact(question, filter, reactions, limit = 60000) {
        const msg = await this.channel.send(question);
        reactions.forEach((r) => {
          msg.react(r);
        });
        const rr = await msg.awaitReactions(filter, {
          max: 1,
          time: limit,
          errors: ["time"],
        });

        const ms = rr.first()._emoji.name;
        return ms;
      }
      succes(content) {
        if (!content) return this.react("786561775705129040");
        if (content) {
          this.channel.send(content);
          this.react("786561775705129040");
        }
      }

      error(content) {
        if (!content) return this.react("786561514122641408");
        if (content) {
          this.channel.send(content);
          this.react("786561514122641408");
        }
      }
    }
);
const Config = require("../models/config");
const level = require("../models/levelconfig");
module.exports = Structures.extend(
  "Guild",
  (Guild) =>
    class AndoiGuild extends Guild {
      constructor(...args) {
        super(...args);
        this.levelconfig = {};
        this.cache = {
          levelconfig: false,
        };
      }

      async getConfig() {
        let data = await Config.findOne({ GuildID: this.id }).catch((err) =>
          console.log(err)
        );
        return data;
      }
      async setConfig(settings) {
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
      async createConfig(settings) {
        const newConfig = new Config(settings);
        return newConfig.save().catch((err) => console.log(err));
      }
      async deleteConfig() {
        await Config.deleteOne({ GuildID: this.id }).catch((err) =>
          console.log(err)
        );
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
      /**
       * Changes the level config.
       *
       * @param {string} config - Config type.
       * @param {boolean} value - New value.
       * @returns {boolean} - If the/a document was created/updated.
       */
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
    }
);
