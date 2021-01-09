const { sendErrorLog } = require("../../utils/functions");

module.exports = {
  name: "error",
  execute: (_client, error) => {
    sendErrorLog(_client, error, "error");
  },
};
