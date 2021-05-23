const { model, Schema } = require("mongoose");
module.exports = model(
  "requirements",
  new Schema({
    message: String,
    role: String,
    permissions: String,
  })
);
