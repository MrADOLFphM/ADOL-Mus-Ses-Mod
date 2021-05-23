module.exports = {
  name: "error",
  execute: (_client, error) => {
    _client.utils.sendErrorLog(_client, error, "error");
  },
};
