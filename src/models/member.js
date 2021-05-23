const { model, Schema } = require("mongoose");
module.exports = model(
  "member",
  new Schema({
    guild: String,
    member: String,
    captcha: String,
    invites: {
      type: Object,
      default: { total: 0, fake: 0, bonus: 0, regular: 0 },
    },
  })
);
