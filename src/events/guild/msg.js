const run = require("../../modules/messageFuntions");
module.exports = {
  name: "message",
  async execute(client, message) {
    await run(message);
  },
};
