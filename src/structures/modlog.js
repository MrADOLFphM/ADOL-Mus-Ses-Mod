const { MessageEmbed } = require("discord.js");

module.exports = class ModLog {
  constructor(guild) {
    this.guild = guild;
    this.client = guild.client;

    this.caseType = null;
    this.user = null;
    this.moderator = null;
    this.reason = null;

    this.timestamp = null;
  }

  /**
   * Gives a type to the mod log
   * @param {string} type type of case
   * @returns {ModLog}
   */
  setType(type) {
    this.type = type;
    return this;
  }

  /**
   * Sets the target user to the mod log
   * @param {User} user target user
   * @returns {ModLog}
   */
  setUser(user) {
    this.user = {
      id: user.id,
      tag: user.tag,
    };
    return this;
  }

  /**
   * Sets the moderator to the mod log
   * @param {User} user moderator user
   * @returns {ModLog}
   */
  setModerator(user) {
    this.moderator = {
      id: user.id,
      tag: user.tag,
      avatar: user.displayAvatarURL({ size: 2048, format: "png" }),
    };
    return this;
  }

  /**
   * Sets the reason for the case
   * @param {string} reason reason of case
   * @returns {ModLog}
   */
  setReason(reason = null) {
    if (Array.isArray(reason)) reason = reason.join(" ");
    this.reason = reason;
    return this;
  }

  /**
   * Sends an embed with all the details of the mod log
   * @returns {<Message>}
   */
  async send() {
    const channelId = await this.guild.getConfig().then((g) => g?.modlog);
    if (!channelId) return;
    let channel = this.guild.channels.cache.get(channelId);
    if (!channel) channel = this.client.channels.fetch(channelId);
    if (!channel) return;
    const e = this.guild.getConfig();
    let le = await this.guild.updateConfig({ cases: e.cases + 1 });
    return channel.send(this.embed);
  }

  /**
   * Creates an embed with all the details of the mod log
   * @returns {KlasaMessage}
   */
  async embed() {
    const lan = await this.guild.getLang();
    return new MessageEmbed()
      .setAuthor(this.moderator.tag, this.moderator.avatar)
      .setColor(ModLog.color(this.type))
      .setDescription(
        [
          `**❯ ${lan.MODLOG.TYPE}**: ${
            this.type[0].toUpperCase() + this.type.slice(1)
          }`,
          `**❯ ${lan.MODLOG.USER}**: ${this.user.tag} (${this.user.id})`,
          `**❯ ${lan.MODLOG.REASON}**: ${this.reason}`,
          `**❯ ${lan.MODLOG.MODERATOR}**: ${this.moderator.tag}`,
        ].join("\n")
      )

      .setTimestamp();
  }

  /**
   * Pack all the case information in an object
   * @returns {Object}
   */
  get caseInfo() {
    return {
      type: this.type,
      user: this.user.id,
      moderator: this.moderator.id,
      reason: this.reason,

      timestamp: this.timestamp,
    };
  }

  /**
   * Gives color corresponding to a type
   * @param {string} type the type of case
   * @returns {string}
   */
  static color(type) {
    switch (type) {
      case "ban":
        return "#d9534f";
      case "unban":
        return "#ab9292";
      case "mute":
        return "#d9534f";
      case "unmute":
        return "#ab9292";
      case "warn":
        return "#fbe400";
      case "kick":
        return "#d9534f";
      case "softban":
        return "#d87370";
      default:
        return "#d9534f";
    }
  }
};
