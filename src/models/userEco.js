const { Schema, model } = require("mongoose");
const { userDefaultStats } = require("../../config.json");

module.exports = model(
  "userEconomy",
  new Schema({
    userID: String,
    bank: { type: Number, default: userDefaultStats.bank },
    money: { type: Number, default: userDefaultStats.money },
    inventory: Array,
    daily: Date,
    work: Date,
    job: { type: String, default: null },
    friends: { type: Array, default: null },
  })
);
