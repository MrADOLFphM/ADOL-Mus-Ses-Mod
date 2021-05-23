const { Schema, model } = require("mongoose");
module.exports = model(
  "inventory",
  new Schema({
    guild: String,
    user: String,
    inventory: { type: Array, default: [] },
  })
);
