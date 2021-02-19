const { Schema, model } = require("mongoose");

module.exports = model(
  "updates",
  new Schema({
    name: { type: String, default: "Andoi" },
    version: String,
    updates: {
      type: Object,
      default: { new: "None", fixed: "None", removed: "None" },
    },
  })
);
