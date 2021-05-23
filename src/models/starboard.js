const { model, Schema } = require("mongoose");
module.exports = model(
  "starboard",
  new Schema({
    guildID: { type: String, required: true },
    channelID: { type: String, required: true },
    options: { type: Object, default: {} },
  })
);
