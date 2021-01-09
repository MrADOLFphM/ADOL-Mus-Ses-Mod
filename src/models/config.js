const { Schema, model } = require("mongoose");
const { configDefaultSettings } = require("../../config.json");

module.exports = model(
  "config",
  new Schema({
    GuildID: String,
    welcomeChannel: String,
    leaveChannel: String,
    autoRole: String,
    muteRole: String,
    suggestChan: String,
    modlog: { type: String, default: null },
    prefix: { type: String, default: configDefaultSettings.prefix },
    disabled: { type: Array, default: ["tickets"] },
    commands: { type: Array, default: [] },
    msg: { type: String, default: null },
    global: { type: String, default: null },
    andoichat: { type: String, default: null },
    badwords: { type: Array, default: [] },
    ignored_channels: { type: Array, default: [] },
    welcomemsg: {
      type: String,
      default:
        "Welcome {user.username} to {server.name} hope you have a good day staying!",
    },
    leavemsg: {
      type: String,
      default: "Bye {user.username} we will miss you",
    },
    custom: { type: Array, default: [] },
    starboardchan: { type: String, default: null },
    starboardnum: { type: Number, default: 3 },
    premium: { type: Boolean, default: false },
    lan: { type: String, default: "english" },
    cases: { type: Number, default: 0 },
  })
);
