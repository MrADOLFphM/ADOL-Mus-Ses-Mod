const { BaseMessageComponent } = require("discord.js");
const { verifyString } = require("discord.js").Util;

function createEnum(keys) {
  const obj = {};
  for (const [index, key] of keys.entries()) {
    if (key === null) continue;
    obj[key] = index;
    obj[index] = key;
  }
  return obj;
}
const MessageButtonStyles = createEnum([
  null,
  "blurple",
  "grey",
  "green",
  "red",
  "url",
]);
const MessageComponentTypes = createEnum([
  null,
  "ACTION_ROW",
  "BUTTON",
  "SELECT_MENU",
]);
const MessageButtonStylesAliases = createEnum([
  null,
  "PRIMARY",
  "SECONDARY",
  "SUCCESS",
  "DESTRUCTIVE",
  "LINK",
]);

module.exports = class MessageButton extends BaseMessageComponent {
  constructor(data = {}) {
    super({ type: "BUTTON" });
    this.setup(data);
  }
  isEmoji(string) {
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return regex.test(string);
  }

  setup(data) {
    this.style = "style" in data ? resolveStyle(data.style) : null;

    this.label =
      "label" in data && data.label ? verifyString(data.label) : undefined;

    this.disabled = "disabled" in data ? data.disabled : false;

    this.emoji = "emoji" in data ? data.emoji : undefined;

    if ("url" in data && data.url) this.url = verifyString(data.url);
    else this.url = undefined;

    if (("id" in data && data.id) || ("custom_id" in data && data.custom_id))
      this.custom_id = data.id || data.custom_id;
    else this.custom_id = undefined;

    return this;
  }

  setStyle(style) {
    style = resolveStyle(style);
    this.style = style;
    return this;
  }

  setLabel(label) {
    label = verifyString(label);
    this.label = label;
    return this;
  }

  setDisabled(disabled = true) {
    this.disabled = disabled;
    return this;
  }

  setURL(url) {
    this.url = verifyString(url);
    return this;
  }

  setCustomID(id) {
    this.custom_id = verifyString(id);
    return this;
  }

  setEmoji(emoji, animated) {
    if (!emoji) return this;
    if (this.isEmoji(emoji) === true)
      this.emoji = { name: verifyString(emoji) };
    else if (emoji.id) this.emoji = { id: emoji.id };
    else if (verifyString(emoji).length > 0)
      this.emoji = { id: verifyString(emoji) };
    else this.emoji = { name: null, id: null };
    if (
      (animated && typeof animated !== "boolean") ||
      (emoji.animated && typeof emoji.animated !== "boolean")
    )
      throw new SyntaxError("The emoji animated option must be boolean");
    if (this.emoji && typeof emoji.animated === "boolean")
      this.emoji.animated = emoji.animated;
    if (this.emoji && typeof animated === "boolean")
      this.emoji.animated = animated;
    return this;
  }

  toJSON() {
    return {
      type: MessageComponentTypes.BUTTON,
      style: this.style,
      label: this.label,
      emoji: this.emoji,
      disabled: this.disabled,
      url: this.url,
      custom_id: this.custom_id,
    };
  }
};
function resolveStyle(style) {
  if (!style || style === undefined || style === null)
    throw new TypeError("NO_BUTTON_STYLE: Please provide button style");

  if (style === "gray") style = "grey";

  if (
    (!MessageButtonStyles[style] ||
      MessageButtonStyles[style] === undefined ||
      MessageButtonStyles[style] === null) &&
    (!MessageButtonStylesAliases[style] ||
      MessageButtonStylesAliases[style] === undefined ||
      MessageButtonStylesAliases[style] === null)
  )
    throw new TypeError(
      "INVALID_BUTTON_STYLE: An invalid button styles was provided"
    );

  return typeof style === "string" ? MessageButtonStyles[style] : style;
}
