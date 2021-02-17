const { Schema, model } = require("mongoose");
const { userDefaultStats } = require("../../config.json");

module.exports = model(
  "userEconomy",
  new Schema({
    userID: String,
    bank: { type: Number, default: userDefaultStats.bank },
    money: { type: Number, default: userDefaultStats.money },
    bankSpace: { type: Number, default: 5000 },
    inventory: Array,
    daily: Date,
    work: Date,
    job: { type: String, default: null },
    friends: { type: Array, default: null },
    afk: {
      type: Object,
      default: {
        is_afk: false,
        reason: null,
      },
    },
  })
);
