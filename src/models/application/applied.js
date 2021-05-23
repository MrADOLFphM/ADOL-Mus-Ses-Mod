const mongoose = require("mongoose");

let applied = mongoose.Schema({
  guildID: { type: String },
  userID: { type: String },
  appID: { type: String, default: "OOOOOOOO" },
  hasApplied: { type: Boolean, default: true },
  status: { type: String, default: "waiting" },
});

module.exports = mongoose.model("applied", applied);
