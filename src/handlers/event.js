const glob = require("glob");
const path = require("path");

module.exports = (client) => {
  const eventFiles = glob.sync("./src/events/**/*.js");
  for (const file of eventFiles) {
    const event = require(path.resolve(file));

    if (!event.execute) {
      throw new Error("Execute function is required!");
    }

    client.on(event.name, event.execute.bind(null, client));
  }
};
