const { Schema, model } = require("mongoose");

module.exports = model(
  "updates",
  new Schema({
    name: { type: String, default: "Andoi" },
    updates: Array,
  })
);
