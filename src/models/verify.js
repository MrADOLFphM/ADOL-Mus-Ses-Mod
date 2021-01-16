const { model, Schema } = require("mongoose");
module.exports = model(
  "verificationConfig",
  new Schema({
    guild_id: {
      type: String,
      default: null,
    },
    channel: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  })
);
