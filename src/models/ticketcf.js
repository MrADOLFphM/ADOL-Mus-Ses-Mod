const { Schema, model } = require("mongoose");

module.exports = model(
  "ticketConfig",
  new Schema({
    guild: String,
    ticketlogs: String,
    support: String,
    cat: String,
  })
);
