const { model, Schema } = require("mongoose");

module.exports = model(
  "covid",
  new Schema({
    guild: String,
    enabled: Boolean,
    channelID: String,
  })
);
