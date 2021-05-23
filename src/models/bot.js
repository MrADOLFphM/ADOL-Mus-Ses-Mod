const { model, Schema } = require("mongoose");

module.exports = model(
  "bot",
  new Schema({
    name: { type: String, default: "Andoi" },
    commandssincerestart: { type: Number, required: true },
    total: { type: Number, default: 0 },
    channel: String,
    lastMsg: String,
  })
);
