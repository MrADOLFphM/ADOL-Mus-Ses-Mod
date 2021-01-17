const { model, Schema } = require("mongoose");
module.exports = model(
  "member",
  new Schema({
    guild: String,
    member: String,
    captcha: String,
  })
);
